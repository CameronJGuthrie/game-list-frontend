import React, { useEffect, useState } from 'react';
import { getGameTypes } from '../api/game';

import CreateGame from './CreateGame';
import GameList from './GameList';

function GamePage() {
  const [gameTypes, setGameTypes] = useState([]);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    async function fetch () {
      try {
        const res = await getGameTypes()
        setGameTypes(res.data);
      } catch (error) {
        console.error(error)
      }
    }
    fetch();
  }, []);

  return (
    <div className="">
      <CreateGame gameTypes={gameTypes} onAdd={() => setReload(true)} />
      <GameList gameTypes={gameTypes} reload={reload} setReload={setReload} />
    </div>
  );
}

export default GamePage;