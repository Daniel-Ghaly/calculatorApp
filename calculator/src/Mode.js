import './App.css';

function ButtonWrapper(props) {
  return (
    <div className = 'mode'>
      <button onClick = {() => {props.handleMode('dark')}} className = 'dark'>dark mode</button>
      <button onClick = {() => {props.handleMode('light')}} className = 'light'>light mode</button>
    </div>
  );
}

export default ButtonWrapper;
