import logo from './logo.svg';
import './App.css';
import Screen from './Screen.js'
import ButtonWrapper from './ButtonWrapper.js'

function Wrapper(props) {
  return (
    <div >
      <Screen result = {props.result} arithmeticString = {props.arithmeticString} />
      <ButtonWrapper handleButtonClick = {props.handleButtonClick} buttons = {props.buttons}/>
    </div>
  );
}

export default Wrapper;
