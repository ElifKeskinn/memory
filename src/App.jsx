import React, { useState } from 'react';
import HomePage from './components/HomePage';
import GameBoard from './components/GameBoard';

const App = () => {
  const [settings, setSettings] = useState(null);

  const startGame = (newSettings) => {
    setSettings(newSettings);
  };

  const handleRestart = () => {
    setSettings(prevSettings => ({ ...prevSettings }));
  };

  const handleGoToHomePage = () => {
    setSettings(null);
  };

  return (
    <div className="app">
      {settings ? (
        <GameBoard 
          settings={settings} 
          endGame={(message) => alert(message)}
          restartGame={handleRestart}
          goToHomePage={handleGoToHomePage}
        />
      ) : (
        <HomePage startGame={startGame} />
      )}
    </div>
  );
};

export default App;
