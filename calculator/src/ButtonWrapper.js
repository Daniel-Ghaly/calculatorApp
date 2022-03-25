import logo from './logo.svg';
import './App.css';
import Wrapper from './Wrapper.js'

function ButtonWrapper(props) {

  if (props.mode === 'dark') {
    return (
      <div className = 'button-wrapper'>
        {props.buttons.map(button => {
          return <button className = {['+','-','/','x','='].includes(button) ? 'operation-button' : 'button-dark'} onClick = {() => props.handleButtonClick(button)}>{button}</button>
        })}
      </div>
    )
  }

  return (
    <div className = 'button-wrapper'>
      {props.buttons.map(button => {
        return <button className = {['+','-','/','x','='].includes(button) ? 'operation-button' : 'button-light'} onClick = {() => props.handleButtonClick(button)}>{button}</button>
      })}
    </div>
  );
}

export default ButtonWrapper;
