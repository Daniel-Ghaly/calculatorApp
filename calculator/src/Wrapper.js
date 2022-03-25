import logo from './logo.svg';
import './App.css';
import Screen from './Screen.js'
import ButtonWrapper from './ButtonWrapper.js'
import Mode from './Mode.js'

function Wrapper(props) {
  return (
    <div >
      <div className = 'top-container'>
        <Screen  mode = {props.mode} result = {props.result} arithmeticString = {props.arithmeticString} />
        <Mode  handleLightMode = {props.handleLightMode} handleDarkMode = {props.handleDarkMode}/>
      </div>
      <ButtonWrapper mode = {props.mode} handleButtonClick = {props.handleButtonClick} buttons = {props.buttons}/>
    </div>
  );
}

export default Wrapper;
