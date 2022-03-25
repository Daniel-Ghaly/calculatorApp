import logo from './logo.svg';
import './App.css';
import Wrapper from './Wrapper.js'
import {useState} from 'react'


/*

FLOW OF CODE: starts at line 98


*/

function App(props) {
  var [arithmeticString, setArithmeticString] = useState('') //the 'screen' text => i.e. '6+3-2'
  var [result, setResult] = useState(null); // the resulting calculation after pressing '=' => '7'
  var buttons = ['AC', 'PREV', 'π', '/',7, 8, 9, 'x',
  4, 5, 6, '-', 1, 2, 3, '+',
  0, '.', 'c','=','(',')','sin','cos','tan','√','x^y','n!']

  function handleButtonClick(button) {

    // helper function to evaluate the arithmetic of two numbers
    function evaluateTwoNums(num1, num2, operation) {

      if(num1 === 'π') {
        num1 = Math.PI
        console.log(num1)
      }
      if(num2 === 'π') {
        num2 = Math.PI
      }
      if(operation === '+') {
        return Number(num1) + Number(num2)
      }
      if(operation === '-') {
        return Number(num1) - Number(num2)
      }
      if(operation === 'x') {

        return Number(num1) * Number(num2)
      }
      if(operation === '/') {
        return Number(num1) / Number(num2)
      }
    }


    // helper function to evaluate any operation string (i.e. '6+3x8' ) and set result to 'result' state
    function evaluateArithmeticString(arithmeticString) {
      ;
      // initialize result
      var count = 0;


       // handle edge case where pi has no operators but user presses '=' -> return pi value
       if (arithmeticString === ('π=')) {
        // round to 6 decimals for better readibility
        setResult(Math.round(Math.PI * 100000) / 100000);
        return Math.round(Math.PI * 100000) / 100000;

      }

      // convery arithmeticString to array i.e.  '10x7+2' ==> ['10','x','7','+','2']
      var operationArray = [];
      let current = '';
      for (let i = 0; i < arithmeticString.length; i++) {

        // exponent functionality

        if (arithmeticString.slice(i, i+1) === '^') {
          var endIndex;
          for (var j = i + 1; j < arithmeticString.length; j++) {
            if (arithmeticString[j] === ')') {
              endIndex = j
            }
          }

          // get inner value i.e. √(49)  => 49
          var innerValue = Number(arithmeticString.slice(i + 2, endIndex))
          operationArray.push((arithmeticString[i-1])**(innerValue));

        }


        // sqrt functionality
        if (arithmeticString.slice(i, i+1) === '√') {
          var endIndex;
          for (var j = i + 1; j < arithmeticString.length; j++) {
            if (arithmeticString[j] === ')') {
              endIndex = j
            }
          }

          // get inner value i.e. √(49)  => 49
          var innerValue = Number(arithmeticString.slice(i + 2, endIndex))
          operationArray.push(innerValue**(.5));

        }


        // cos function
        if (arithmeticString.slice(i, i+3) === 'cos') {
          var endIndex;
          for (var j = i + 3; j < arithmeticString.length; j++) {
            if (['x','-','=','/','+'].includes(arithmeticString[j])) {
              endIndex = j
            }
          }
          var innerValue = arithmeticString.slice(i + 3, endIndex)
          innerValue += '='
          ;
          var innerValueResult = evaluateArithmeticString(innerValue)

          operationArray.push(Math.cos(innerValueResult));

        }

        // sin function

          if (arithmeticString.slice(i, i+3) === 'sin') {
            var endIndex;
            debugger;
            for (var j = i + 3; j < arithmeticString.length; j++) {
              if (['x','-','=','/','+'].includes(arithmeticString[j])) {
                endIndex = j
              }
            }
            var innerValue = arithmeticString.slice(i + 3, endIndex)
            innerValue += '='
            ;
            var innerValueResult = evaluateArithmeticString(innerValue)


           var result = Math.sin(innerValueResult);
            // handle edge case with JS making sin(pi) a very very small e-16 number instead of 0
            if (result < 0.0001 && result > -0.0001) {
              operationArray.push(0);
            } else {
              operationArray.push(Math.sin(innerValueResult));

            }

          }

        // tan function
        if (arithmeticString.slice(i, i+3) === 'tan') {
          var endIndex;
          debugger;
          for (var j = i + 3; j < arithmeticString.length; j++) {
            if (['x','-','=','/','+'].includes(arithmeticString[j])) {
              endIndex = j
            }
          }
          var innerValue = arithmeticString.slice(i + 3, endIndex)
          innerValue += '='
          ;
          var innerValueResult = evaluateArithmeticString(innerValue)
          operationArray.push(Math.tan(innerValueResult));

        }

          // if not special function, push numbers to operationArray
          // if (isNaN(Number(arithmeticString[i])) && arithmeticString[i] !== '.' && arithmeticString[i] !== 'π' ) {

            if (['x','-','/','+','='].includes(arithmeticString[i])) {
              operationArray.push(current);
              current = '';
              operationArray.push(arithmeticString[i]);
          } else {
              current += arithmeticString[i];
          }

      }
      operationArray.push(current);

      debugger;
      // operationArray populated ==> now to evaluate the array...


      // evalulate factorial

      operationArray.forEach((character, i) => {
        if (character.includes('!')) {
          // get n of factorial i.e. 25! ==> 25
          var n = character.slice(0, -1)
          var factorial = getFactorial(n)
          // change factorial to evaluated result
          operationArray[i] = factorial
        }
      })

      function getFactorial(num) {
        var product = 1;
        for (var i = num; i > 0; i--) {
          product *= i
        }
        return product;
      }

      // evaluate products and quotients before addition/subtraction (PEMDAS)
      if (operationArray.includes('x') || operationArray.includes('/')) {
        operationArray.forEach((character, i) => {
          if (character === 'x') {
            var product = evaluateTwoNums(operationArray[i-1], operationArray[i+1], 'x')
            // replace evaluated product into operationsArray i.e. [3,+,4,*,5,+,4] => [3,20,4]
            operationArray.splice(i-1, 3, product)
          } else if (character === '/') {
            var quotient = evaluateTwoNums(operationArray[i-1], operationArray[i+1], '/')
            // replace evaluated quotient into operationsArray i.e. [3,+,4,*,2,+,4] => [3,2,4]
            operationArray.splice(i-1, 3, quotient)
          }
        });
      }

      // add/subtract remaining values
      operationArray.forEach((character, i) => {
        // initialize count for first number pressed
        if(i === 0) {
          count = Number(operationArray[i])
          return;
        }
        if (character === '+') {
          count += Number(operationArray[i+1])
        } else if (character === '-') {
          count -= (Number(operationArray[i+1]))
        }
      });

      // update 'result' state
      // handle edge case where decimal is extremely long --> shorten to 6 digits for better readability
      setResult(Math.round(count * 100000) / 100000);
      return count
    }

    // concatenate numbers and operation characters to the arithmeticString -- i.e. '6+2*3'
    if(typeof button === 'number' || ['+','-','x','/','=','π','(',')', 'cos', 'sin', 'tan','.','√','x^y', 'n!'].includes(button) ) {

      // add factorial symbol to arithmeticString
      if (button === 'n!') {
        button = '!'
      }

      // handle edge case where user inputs operation before number
      if (arithmeticString.length === 0 && ['+','-','x','/','=','x^y','n!'].includes(button) ) {
      return;
    }

      // auto-add first parenthesis for sqrt and trig functions
      if (['√', 'sin', 'cos', 'tan'].includes(button)) {
        button += '('
      }

      // add exponent ^ symbol when pressing x^y button
      if (button === 'x^y') {
        button = '^('
      }

      // clear result and arithmetic string if result view is currently being shown
      if(result) {
        setArithmeticString('')
        setResult(null)
      }

        // handle edge case where user inputs two operations in a row
      if (['+','-','x','/','=','x^y','^'].includes(arithmeticString.slice(-1)) ) {
        if(button === arithmeticString.slice(-1)) {
          return;
        } else if (['+','-','x','/','=','x^y','^'].includes(button)) {
          // still allow user to change operation without having to clear last character
          arithmeticString = arithmeticString.slice(0, -1)
          setArithmeticString(arithmeticString += button.toString())
        } else {
          setArithmeticString(arithmeticString += button.toString())
        }
      } else {
        setArithmeticString(arithmeticString += button.toString())
      }
    }

    // if user clicks '=', evalulate result using evaluateArithmeticString function
    if (button === '=') {

     // handle edge case -- if only pi is inputted, convert to pi value
     if (arithmeticString === 'π=') {
      // round to 6 deciamals for better readibility
      setResult(Math.round(Math.PI * 100000) / 100000);
      return Math.round(Math.PI * 100000) / 100000
    }

      // edge case: if user leaves out parentheses, automatically add second parenthesis
      // i.e. √(49  would give 7 instead of an error
      if (arithmeticString.includes('(') && !arithmeticString.includes(')')) {
        arithmeticString = arithmeticString.slice(0, -1)
        setArithmeticString(arithmeticString += ')=')
      }

      // check for parentheses to eveluate that arithmeticString first; exclude trig/sqrt/exponent functions for separation of concerns
      while (arithmeticString.includes('(') && !arithmeticString.includes('√(') && !arithmeticString.includes('^(')) {
        debugger;
        // substring between pair of (); i.e. '6+(3+4)' ==> '3+4'
        var startIndex = arithmeticString.indexOf('(') + 1
        var endIndex = arithmeticString.indexOf(')')
        var parenSubstring = arithmeticString.slice(arithmeticString.indexOf('(') + 1, arithmeticString.indexOf(')'))
        parenSubstring += '='
        // evaluate substring. i.e. '3+4' ==> 7
        var result = evaluateArithmeticString(parenSubstring)
        debugger;
        arithmeticString = arithmeticString.split('')
        arithmeticString.splice(startIndex - 1, endIndex - startIndex + 2, result)
        arithmeticString = arithmeticString.join('')

        // evaluateArithmeticString(arithmeticString)

        // arithmeticString = arithmeticString.slice(0, startIndex) + arithmeticString.slice(startIndex + 1)
        // arithmeticString = arithmeticString.splice(startIndex, startIndex - startIndex, evaluateArithmeticString(parenSubstring)).join('')
      }
      // once parentheses expressions are simplified,
      // pass in arithmetic string to evaluateArithmeticString()
      evaluateArithmeticString(arithmeticString)
    }
      // delete characters of arithmetic string if user presses 'c' button
      if (button === 'c') {
        setArithmeticString(arithmeticString.slice(0, -1))
        // if in result mode, let 'c' simply clear the whole
        if (result) {
          setResult(null)

        }

      }

      // deletes entire arithmetic string and resets result to null if user presses 'ac' button
      if(button === 'AC') {
        setArithmeticString('')
        setResult(null)
      }

  }

  return (
    <div className = 'wrapper'>
      <Wrapper result = {result} arithmeticString = {arithmeticString} handleButtonClick = {handleButtonClick} buttons = {buttons}/>
    </div>
  );
}

export default App;
