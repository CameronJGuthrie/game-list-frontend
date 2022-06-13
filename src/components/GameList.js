import { useEffect, useState } from 'react';

import GameItem from './GameItem';
import { getGame, getGames } from '../api/game';
import './GameList.css';

function GameList(props) {
  const [games, setGames] = useState([]);

  async function fetchGames () {
    try {
      const res = await getGames();
      setGames(res.data.sort((g1, g2) => {
        return g1.releaseYear - g2.releaseYear;
      }));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (props.reload) {
      fetchGames();
      props.setReload(false);
    }
  }, [props, props.reload]);

  const fetch = async (id) => {
    try {
      const response = await getGame(id);
      setGames(games.map(game => {
        return (game.id === id)
          ? response.data
          : game;
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const remove = (id) => {
    setGames(games.filter(game => game.id !== id));
  }

  return (
    <div className="grid grid-cols-12 gap-5 p-5">
      {
        games.map((game) => {
          return (
            <div className="col-span-12 md:col-span-6 lg:col-span-4" key={game.id}>
              <GameItem
                id={game.id}
                title={game.title}
                description={game.description}
                releaseYear={game.releaseYear}
                type={game.type}
                websiteLink={game.websiteLink}
                gameTypes={props.gameTypes}
                onSave={() => fetch(game.id)}
                onDelete={() => remove(game.id)}
              />
            </div>
          )
        })
      }
    </div>
  );
}

export default GameList;