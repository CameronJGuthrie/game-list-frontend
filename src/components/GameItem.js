import React, { useEffect, useState } from 'react';
import { deleteGame, updateGame } from '../api/game';
import './GameItem.css';
import GameTypeSelect from './GameTypeSelect';

function GameItem(props) {
  const [editing, setEditing] = useState(false);
  const [deleteButtonText, setDeleteButtonText] = useState('Delete');
  const [saveButtonText, setSaveButtonText] = useState('Save');
  const [game, setGame] = useState({
    id: 0,
    title: '',
    description: '',
    releaseYear: '',
    type: { name: '', description: '' },
    websiteLink: '',
  });
  const [gameSnapshot, setGameSnapshot] = useState({});

  useEffect(() => {
    setGame({
      id: props.id,
      title: props.title ?? '',
      description: props.description ?? '',
      releaseYear: props.releaseYear ?? '',
      type: props.type?.name ?? '',
      websiteLink: props.websiteLink ?? '',
    })
  }, [props.description, props.id, props.releaseYear, props.title, props.type, props.websiteLink]);

  const edit = () => {
    setGameSnapshot({...game})
    setEditing(true);
  }
  const save = async () => {
    try {
      setSaveButtonText('Saving...');
      await updateGame(props.id, game)
      props.onSave?.();
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaveButtonText('Save');
    }
  }
  const cancel = () => {
    setGame({...gameSnapshot})
    setEditing(false);
  }
  const del = async () => {
    try {
      setDeleteButtonText('Deleting...');
      await deleteGame(props.id)
      props.onDelete?.();
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteButtonText('Delete');
    }
  }

  const onTitleChange = (event) => {
    setGame({...game, title: event.target.value });
  }
  const onReleaseYearChange = (event) => {
    setGame({...game, releaseYear: event.target.value });
  }
  const onTypeChange = (value) => {
    setGame({...game, type: value }); // TODO
  }
  const onWebsiteLinkChange = (event) => {
    setGame({...game, websiteLink: event.target.value });
  }
  const onDescriptionChange = (event) => {
    setGame({...game, description: event.target.value });
  }

  return (
    <div className="game-item h-full bg-[#98B6B1] shadow-md mx-auto gap-1 p-3 pt-6">
      <div className="flex flex-col relative">
        <div className="flex button-container">
          {
            editing
              ? <React.Fragment>
                  <button onClick={save} className="bg-[#a6aebd] border max-h-8 px-4 ml-2">{saveButtonText}</button>
                  <button onClick={cancel} className="bg-[#bda6a6] border max-h-8 px-4 ml-2">Discard</button>
                </React.Fragment>
              : <React.Fragment>
                  <button onClick={edit} className="bg-[#a6bdaf] border max-h-8 px-4 ml-2">Edit</button>
                  <button onClick={del} className="bg-[#be8d8d] border max-h-8 px-4 ml-2">{deleteButtonText}</button>
                </React.Fragment>
          }
        </div>
        <div className="flex flex-row">
          {
            editing
              ? <input
                  type='text'
                  title="Title"
                  placeholder="Title..."
                  value={game.title}
                  onChange={onTitleChange}
                  className="grow"
                />
              : <a
                  href={props?.websiteLink}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#234B50] font-bold text-xl underline">
                  { props?.title }
                </a>
          }
          {
            editing
              ? <input
                  type='number'
                  min="1970"
                  max={new Date().getFullYear() + 10}
                  title="Release Year"
                  value={game.releaseYear}
                  onChange={onReleaseYearChange}
                  className="ml-2"
                />
              : <span title="Release Year" className="ml-2 text-xs font-bold">{ props?.releaseYear }</span>
          }
        </div>
        <div>
          {
            editing
              ? <GameTypeSelect value={game.type ?? null} gameTypes={props.gameTypes} onChange={onTypeChange}></GameTypeSelect>
              : <span title="Genre">{ props.gameTypes?.find(type => type.name === game.type)?.description ?? '' }</span>
          }
        </div>
        <div className='flex'>
          {
            editing && <input
              type='text'
              title="Link"
              placeholder='E.g. https://www.google.com/'
              value={game.websiteLink}
              onChange={onWebsiteLinkChange}
              className="grow"
            />
          }
        </div>
        <div className='flex'>
          {
            editing
              ? <textarea
                type='text'
                title="Description"
                placeholder="Description..."
                value={game.description}
                onChange={onDescriptionChange}
                className="grow"
              />
              : <span title="Description" className="mt-2">{ props?.description }</span>
          }
        </div>
      </div>
    </div>
  );
}

export default GameItem;