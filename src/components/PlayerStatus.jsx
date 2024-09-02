import React from 'react';

const PlayerStatus = ({ players, scores, moves, time, currentPlayer }) => {
  return (
    <div className="player-status">
      {players === 1 ? (
        <>
          <div>Time: {time}s</div>
          <div>Moves: {moves}</div>
        </>
      ) : (
        <div className="playerturn">
          {scores.map((score, index) => (
            <div
              key={index}
              className={currentPlayer === index ? 'active-player' : 'inactive-player'}
            >
              Player {index + 1}: {score}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerStatus;
