import './App.css';
import Wrapper from './Wrapper.js'
import { useState } from 'react'

/*

FLOW OF CODE:
1) as user presses characters on calculator, the characters get concatenated into a string (lines 38-41)
2) when user presses equal sign, that string gets parsed into an array and a value is calculated and returned (lines 43-46)


EDGE CASES:
1) if user leaves out parentheses, automatically add second parenthesis
2) handle edge case where user inputs two operations/special expressions in a row
3) handle edge case where user inputs operation before number
4) handle edge case where user no further history; keep current view instead of making screen blank
5) handle edge case where decimal becomes extremely long --> shorten to 6 digits for better readability

*/

function App(props) {

  var [arithmeticString, setArithmeticString] = useState('') //the 'screen' text => i.e. '6+3-2'
  var [result, setResult] = useState(null); // the resulting calculation after pressing '=' => '7'
  var [history, setHistory] = useState([]); // archive for storing all entries
  var [index, setIndex] = useState(null) // set index variable to track history view
  var [mode, setMode] = useState('dark') // toggle between light/dark mode



  var buttons = ['AC', 'PREV', 'π', '/',7, 8, 9, 'x',
  4, 5, 6, '-', 1, 2, 3, '+',
  0, '.', 'c','=','(',')','sin','cos','tan','√','x^y','n!','1/x','x^2','log','ln']


  function handleButtonClick(button) {

    // concatenate numbers and operation characters to the arithmeticString -- i.e. '6+2*3'
    if(typeof button === 'number' || ['+','-','x','/','=','π','(',')', 'cos', 'sin', 'tan','.','√','x^y', 'n!','1/x','x^2','log','ln'].includes(button) ) {
      createArithmeticString(button)
    }

    // if user clicks '=', evalulate arithmeticString using evaluateArithmeticString helper function
    if (button === '=') {
    handleEqualSign(button)
    }


    // if user clicks 'PREV', evalulate show previous arithmetic and resulting value
    if (button === 'PREV') {
      handlePrev()
    }



    // handle the deletion of characters or clearing of screen
    if (button === 'c' || button === 'AC') {
      handleDeleteInput(button)
    }

  }

  //toggle between light and dark mode
  function handleMode(mode) {
  if (mode === 'light') {
    setMode('light')
  } else if (mode === 'dark') {
    setMode('dark')
    }
  }

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

  function createArithmeticString(button) {

     // handle logic where result is already calculated --> edge case #1: user presses an operation to continue doing arithmetic on current calculated result; edge case #2: user presses number, which will clear screen and "reset" the calculator

    if(result) {
      // handle edge case #1 -- allow user to continue operating
      if (['-','x','+','/'].includes(button)) {
        var currentString = arithmeticString.slice()
        currentString = arithmeticString.slice (0, -1)
        setArithmeticString(currentString += button);
        return;
      }
      if (['-','x','+','/'].includes(arithmeticString[arithmeticString.length - 1])) {
        var currentString = arithmeticString.slice()
        setArithmeticString(currentString += button);
        return;
      }

      // handle edge case #2 -- clear screen for user
      if (button !== '=') {
        setArithmeticString(button.toString());
        setResult(null);
        return;
      }
    }

    //handle x^2
    if (button === 'x^2') {
      var startIndex;
      for(var i = arithmeticString.length - 1; i >= 0; i--) {
        if (['x','-','+','/'].includes(arithmeticString[i]) || i === 0) {
          startIndex = i
          break;
        }
      }
      var base = arithmeticString.slice(startIndex)
      var baseDigits= arithmeticString.slice(startIndex).length;
      var endIndex = -1 * baseDigits
      arithmeticString = arithmeticString.slice(0, endIndex)
      var calculation = Number(base**2 * 1000000 / 1000000)
      // round to 6 decimals
      button = Math.round(calculation * 100000) / 100000
    }

    // handle 1/x
    if (button === '1/x') {
      var startIndex;
      for(var i = arithmeticString.length - 1; i >= 0; i--) {
        if (['x','-','+','/'].includes(arithmeticString[i]) || i === 0) {
          startIndex = i
          break;
        }
      }
      var bottomFraction = arithmeticString.slice(startIndex)
      var bottomFractionDigits = arithmeticString.slice(startIndex).length;
      var endIndex = -1 * bottomFractionDigits
      arithmeticString = arithmeticString.slice(0, endIndex)
      // button = `1/${bottomFraction}`
      var calculation = Number(1/bottomFraction * 1000000 / 1000000)
      // round to 6 decimals
      button = Math.round(calculation * 100000) / 100000
    }

    // add factorial symbol to arithmeticString
    if (button === 'n!') {
      button = '!'
    }

    // handle edge case where user inputs operation before number
    if (arithmeticString.length === 0 && ['+','-','x','/','=','x^y','n!'].includes(button) ) {
    return;
  }

    // auto-add first parenthesis for sqrt, trig, and log functions
    if (['√', 'sin', 'cos', 'tan', 'log','ln'].includes(button)) {
      button += '('
    }

    // add exponent ^ symbol when pressing x^y button
    if (button === 'x^y') {
      button = '^('
    }


      // handle edge case where user inputs two operations/special expressions in a row
    if (['+','-','x','/','=','x^y','^','1/x'].includes(arithmeticString.slice(-1)) ) {
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

  function handleEqualSign(button) {


    // edge case: if user leaves out parentheses, automatically add second parenthesis
    // i.e. √(49  would give 7 instead of an error
    if (arithmeticString.includes('(') && !arithmeticString.includes(')')) {
      arithmeticString = arithmeticString.slice(0, -1)
      setArithmeticString(arithmeticString += ')=')
    }

    // check for parentheses to eveluate that arithmeticString first
    while (arithmeticString.includes('(')) {
      ;
      // get substring between pair of (); i.e. '6+(3+4)' ==> '3+4'
      var startIndex = arithmeticString.indexOf('(') + 1
      var endIndex = arithmeticString.indexOf(')')
      var parenSubstring = arithmeticString.slice(arithmeticString.indexOf('(') + 1, arithmeticString.indexOf(')'))
      parenSubstring += '='
      // evaluate substring. i.e. '3+4' ==> 7
      var result = evaluateArithmeticString(parenSubstring)
      ;
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

  // function to evaluate any operation string (i.e. '6+3x8' ) and set result to 'result' state
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

    // convert arithmeticString to array i.e.  '10x7+2' ==> ['10','x','7','+','2']
    var operationArray = [];
    let current = '';
    for (let i = 0; i < arithmeticString.length; i++) {


      if (['x','-','/','+','='].includes(arithmeticString[i])) {
        operationArray.push(current);
        current = '';
        operationArray.push(arithmeticString[i]);
      } else {
        current += arithmeticString[i];
      }
    }

    operationArray.push(current);
    operationArray = operationArray.slice(0, -1)


    // iterate through operationArray to simplify special expressions
    operationArray.forEach( (character, i) => {

      // handle x^2 button

      if (character.includes('^2')) {
        var result = operationArray[i-1]**2
         // replace result into operationArray
         operationArray[i] = result;
      }

      //handle 1/x button
      if (character.includes('1/')) {
        var result = 1 / Number(character.slice(2))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle square root expressions
      if (character.includes('√')) {
        var result = Number(character.slice(1))**(0.5)
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle log expressions
      if (character.includes('log')) {
        var result = Math.log10(Number(character.slice(3)))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle ln expressions
      if (character.includes('ln')) {
        var result = Math.log(Number(character.slice(2)))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle sin expressions
      if (character.includes('sin')) {
        var result = Math.sin(Number(character.slice(3)))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle cos expressions
      if (character.includes('cos')) {
        var result = Math.cos(Number(character.slice(3)))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle tan expressions
      if (character.includes('tan')) {
        var result = Math.tan(Number(character.slice(3)))
        // replace result into operationArray
        operationArray[i] = result;
      }

      // handle exponent functions
      if (character.includes('^')) {
        var carrotIndex = character.indexOf('^')
        var baseNumber = character.slice(0, carrotIndex)
        var exponent = character.slice(carrotIndex + 1)
        var result = baseNumber**(exponent)
        // replace result into operationArray
        operationArray[i] = result;
      }

      // evaluate factorial
      if (character.includes('!')) {
        // get n of factorial i.e. 25! ==> 25
        var n = character.slice(0, -1)
        var factorial = getFactorial(n)
        // change factorial to evaluated result
        operationArray[i] = factorial
      }

      // helper function to calculate any factorial, given a number n
      function getFactorial(n) {
        var product = 1;
        for (var i = n; i > 0; i--) {
          product *= i
        }
        return product;
      }

    })

    // handle edge case where no operation is inputted --> just return number
    if (operationArray.length === 2) {
      setResult(Math.round(operationArray[0] * 100000) / 100000)
    }

    // *******
    // *******
    // ******* Special expressions are now simplified
    // ******* below code is to add/multiply/subtract/divide remaining constants and return a calculation
    // *******
    // *******


    // evaluate products and quotients before addition/subtraction (PEMDAS)
    if (operationArray.includes('x') || operationArray.includes('/')) {
      for (var i = 0; i < operationArray.length; i++) {
        if (operationArray[i] === 'x') {
          var product = evaluateTwoNums(operationArray[i-1], operationArray[i+1], 'x')
          // replace evaluated product into operationsArray i.e. [3,+,4,*,5,+,4] => [3,20,4]
          operationArray.splice(i-1, 3, product)
          i--
        } else if (operationArray[i] === '/') {
          var quotient = evaluateTwoNums(operationArray[i-1], operationArray[i+1], '/')
          // replace evaluated quotient into operationsArray i.e. [3,+,4,*,2,+,4] => [3,2,4]
          operationArray.splice(i-1, 3, quotient)
          i--
        }
      }

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
    var result = Math.round(count * 100000) / 100000
    setResult(result);
    var currentHistory = history.slice()
    var newEntry = [arithmeticString, result];
    currentHistory.push(newEntry)
    setIndex(currentHistory.length)
    setHistory(currentHistory)
    return count
  }


  function handlePrev(button) {
    // handle edge case where user no further history; keep current view instead of making screen blank
    if (index === 1) {
      setArithmeticString(history[0][0])
      setResult(history[0][1])
    }


    // get previous entry by subtracting 1 from current 'index' state
    var currentHistory = history.slice()
    var prevEntry = currentHistory[index - 2]
    // set corresponding arithmetic string and result using prevEntry array
    setArithmeticString(prevEntry[0])
    setResult(prevEntry[1])
    // subract index minus 1 for next next previous
    setIndex(index - 1)
  }


  function handleDeleteInput(button) {
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
      <Wrapper mode = {mode} handleMode = {handleMode} result = {result} arithmeticString = {arithmeticString} handleButtonClick = {handleButtonClick} buttons = {buttons}/>
    </div>
  );
}

export default App;