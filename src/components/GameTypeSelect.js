import './GameTypeSelect.css';

function GameTypeSelect(props) {

  const onGameTypeChange = (event) => {
    props.onChange(event.target.value);
  }

  return (
    <select name="game-types" id="game-types" title="Genre" value={props.value} onChange={onGameTypeChange}>
      <option value={''}>-</option>
    {
      props.gameTypes?.map(({name, description}) => {
        return (<option key={name} value={name}>{description}</option>)
      })
    }
    </select>
  );
}

export default GameTypeSelect;