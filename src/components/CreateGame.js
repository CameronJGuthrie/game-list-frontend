import GameTypeSelect from './GameTypeSelect';
import './CreateGame.css';
import { useState } from 'react';
import { addGame } from '../api/game';

function CreateGame(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [type, setType] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  
  const [error, setError] = useState("");

  const createGame = async () => {
    try {
      setError("");
      const errors = [];

      !title && errors.push("Title mandatory");
      !description && errors.push("Description mandatory");
      !type && errors.push("Genre mandatory");

      if (errors.length) {
        setError(errors.join(', '));
        return;
      }

      await addGame({
        title,
        description,
        releaseYear,
        type,
        websiteLink
      })

      setTitle("");
      setDescription("");
      setReleaseYear(new Date().getFullYear());
      setType("");
      setWebsiteLink("");

      props.onAdd?.()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col flex-nowrap">
      <div className="create-game-container flex flex-col text-center">
        <h4 className="text-3xl mb-2">Add a Game</h4>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="genre">Genre</label>
        <GameTypeSelect
          id="genre"
          gameTypes={props.gameTypes}
          value={type}
          onChange={(e) => setType(e)}
        />

        <label htmlFor="title">Release Year</label>
        <input
          id="title"
          type="number"
          min="1970"
          max={new Date().getFullYear() + 10}
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label htmlFor="websiteLink">Link</label>
        <input
          id="websiteLink"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />

        { error && (<div className="text-red-700 font-bold">{error}</div>)}

        <div>
          <button onClick={createGame} className="bg-slate-400 border px-8 my-4">Add Game</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGame;