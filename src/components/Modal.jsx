import React from 'react';

const Modal = ({ isSinglePlayer, gameResults, onRestart, onNewGame }) => {
  return (
    <div className="modal-overlay">
    <div className="modal">
      <div className="modal-content">
        {isSinglePlayer ? (
          <div className="single-player-modal">
            <h1>You Did It!</h1>
            <p>Game Over! Here's how you got on...</p>
            <div className="modal-info">
              <div className="info-box">
                <span>Time Elapsed</span>
                <span>{gameResults.time}s</span>
              </div>
              <div className="info-box">
                <span>Moves Taken</span>
                <span>{gameResults.moves}</span>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="restart-button" onClick={onRestart}>Restart</button>
              <button className="newgame-button" onClick={onNewGame}>New Game</button>
            </div>
          </div>
        ) : (
          <div className="multi-player-modal">
            <h1>{gameResults.isTie ? "It's a Tie!" : `${gameResults.winner} Wins!`}</h1>
            <p>Game Over! Here are the results...</p>
            {gameResults.players.map((player, index) => (
              <div
                key={index}
                className="player-result"
                style={{
                  backgroundColor: player.isWinner ? '#152938' : '#DFE7EC',
                  color: player.isWinner ? 'white' : '#7191A5',
                  
                }}
              >
                <span>Player {index + 1}</span>
                <span>{player.pairs} pairs</span>
              </div>
            ))}
            <div className="modal-buttons">
              <button className="restart-button" onClick={onRestart}>Restart</button>
              <button className="newgame-button" onClick={onNewGame}>New Game</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Modal;
