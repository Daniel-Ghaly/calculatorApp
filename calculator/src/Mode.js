import './App.css';

function ButtonWrapper(props) {
  return (
    <div className = 'mode'>
      <button onClick = {props.handleDarkMode} className = 'dark'>dark mode</button>
      <button onClick = {props.handleLightMode} className = 'light'>light mode</button>
    </div>
  );
}

export default ButtonWrapper;
