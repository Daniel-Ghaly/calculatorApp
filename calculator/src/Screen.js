import logo from './logo.svg';
import './App.css';
import Wrapper from './Wrapper.js'

function Screen(props) {
  return (

    <div className = 'operation-string'>

      {/* render a different UI depending on whether a result is being evaluated or not */}
      {props.result !== null ?
        <div>
          <div className = 'operation-string-result-text'>{props.arithmeticString}</div>
          <div className = 'result'>{props.result}</div>
        </div>
        :
        <div className = 'operation-string-default-text'>{props.arithmeticString}</div>
      }

    </div>
  );
}

export default Screen;
