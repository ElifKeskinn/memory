import React from 'react';

const Card = ({ card, onClick }) => {

  const getClassNames = () => {
    if (card.matched) return `card matched ${card.theme}`;
    if (card.flipped) return `card flipped ${card.theme}`;
    return `card closed ${card.theme}`;
  };

  return (
    <div
      className={getClassNames()}
      onClick={onClick}
    >
      {card.flipped || card.matched ? card.value : ''}
    </div>
  );
};

export default Card;
