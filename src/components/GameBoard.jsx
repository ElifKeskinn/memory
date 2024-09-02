import React, { useState } from 'react';
import Card from './Card';
import PlayerStatus from './PlayerStatus';
import Modal from './Modal';

const generateBoard = (size, theme) => {
  const totalCards = size === '4x4' ? 16 : 36;
  
  let values;
  if (theme === 'icons') {
     values = [
      '🐶', '🦄', '🐻', '🦁', '🐰', '🦜', '🦢', '🦉', '🦤', '🐙',  '🐬', '🐝', '🦋', '🐞', '🐜', '🦘', '🦨', '🦥'];
     values = values.slice(0, totalCards / 2);
    } else {
    values = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
  }
  const boardValues = [...values, ...values].sort(() => Math.random() - 0.5);
  return boardValues.map((value, i) => ({
    id: i,
    value: value,
    theme: theme,
    flipped: false,
    matched: false,
  }));
};

const GameBoard = ({ settings,  goToHomePage }) => {
  const [board, setBoard] = useState(() => generateBoard(settings.gridSize, settings.theme));
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState(Array(settings.players).fill(0));
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameResults, setGameResults] = useState({});
  const isSinglePlayer = settings.players === 1;
  
  const startSinglePlayerTimer = () => {
    if (settings.players === 1 && !intervalId) {
      const id = setInterval(() => setTime(time => time + 1), 1000);
      setIntervalId(id);
    }
  };

  const stopSinglePlayerTimer = () => {
    if (settings.players === 1 && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleCardClick = (id) => {
    startSinglePlayerTimer();

    if (flippedCards.length === 2) return;

    const newBoard = [...board];
    const card = newBoard.find(card => card.id === id);
    if (card.flipped || card.matched) return;

    card.flipped = true;
    setBoard(newBoard);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      setMoves(prevMoves => prevMoves + 1);
      const [firstCard] = flippedCards;

      if (firstCard.value === card.value) {
        firstCard.matched = true;
        card.matched = true;
        setScores(prev => {
          const newScores = [...prev];
          newScores[currentPlayer] += 1;
          return newScores;
        });
        setFlippedCards([]);

        if (newBoard.every(card => card.matched)) {
          if (isSinglePlayer) {
            stopSinglePlayerTimer();
            setGameResults({ time, moves });
            setShowModal(true);
          } else {
            determineWinner(); 
          }
        }
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          card.flipped = false;
          setFlippedCards([]);
          setCurrentPlayer((currentPlayer + 1) % settings.players);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setBoard(generateBoard(settings.gridSize, settings.theme));
    setFlippedCards([]);
    setMoves(0);
    setCurrentPlayer(0);
    setScores(Array(settings.players).fill(0));
    setTime(0);
    stopSinglePlayerTimer();
    setShowModal(false);
  };


  const handleNewGame = () => {
    goToHomePage();
    setShowModal(false);
  };

  const determineWinner = () => {
    const highestScore = Math.max(...scores);
    const winners = scores.map((score, index) => ({
      isWinner: score === highestScore,
      pairs: score
    }));


    const isTie = winners.every(winner => winner.pairs === highestScore);

    setGameResults({
      isTie,
      winner: isTie ? 'IT\'S A TIE!' : `Player ${scores.indexOf(highestScore) + 1}`,
      players: winners
    });
    setShowModal(true);
  };

  return (
    <div>
        {showModal && (
        <Modal
          isSinglePlayer={isSinglePlayer}
          gameResults={gameResults}
          onRestart={handleRestart}
          onNewGame={handleNewGame}
        />
      )}
      <div className="gameboard" style={{ gridTemplateColumns: `repeat(${settings.gridSize === '4x4' ? 4 : 6}, 1fr)` }}>
        {board.map(card => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      <PlayerStatus
        players={settings.players}
        scores={scores}
        moves={moves}
        time={time}
        currentPlayer={currentPlayer}
      />
      <div className="gameboard-controls">
        <button className="restart-button" onClick={handleRestart}>Restart</button>
        <button className="newgame-button" onClick={goToHomePage}>New Game</button>
      </div>
    </div>
  );
};

export default GameBoard;
