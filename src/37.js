let fs = require('fs');
let path = require('path');

function getRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}

fs.readFile(path.join(__dirname, './data.txt'), 'utf-8', (err, data) => {
  if (err) throw err;

  // Find all the lines in the file
  const lines = data.split('\n');

  let nodejsCode = '';

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();

    // Check each line to see if it starts with 'if' or 'for'
    if ((currentLine.startsWith('if') || currentLine.startsWith('for')) && isExpression(currentLine)) {
      nodejsCode += `if (${getCurrentValueFromLine(lines, i)});\n`;
    } else {
      // Add the code for other cases
      let linesInFunction = getLinesInFunction(lines, i);
      if (linesInFunction.length > 0) {
        line = `${isExpression(currentLine) ? ' ${getLineNumber(currentLine)} ' : ''}return ${getNextValueFromLine(lines, i)}\n`;
      } else {
        line = `console.log("Invalid code");\n`;
      }
    }
  }

  // Add the last line if it is not empty
  if (line) {
    nodejsCode += line;
  }

  fs.writeFile(path.join(__dirname, './output.js'), nodejsCode, err => {
    if (err) throw err;

    console.log('NodeJS code has been successfully written to output.js');
  });
}

function isExpression(code) {
  // Add your expression checking logic here
  return true;
}

function getNextValueFromLine(lines, i) {
  let currentValue = lines[i].trim();
  if (currentValue.startsWith('var ')) {
    return `new ${getCurrentValueFromLine(lines, i + 1)}();`;
  } else {
    return `return ${getNextValueFromLine(lines, i + 1)}\n`;
  }
}

function getNextValueFromLineNoSpaces(lines, i) {
  let currentValue = lines[i].trim();
  if (currentValue.startsWith('var ')) {
    return `new ${getCurrentValueFromLineNoSpaces(lines, i + 2)}();`;
  } else {
    return `return ${getNextValueFromLineNoSpaces(lines, i + 1)}\n`;
  }
}

function getLinesInFunction(lines, lineNumber) {
  let linesToCheck = [];
  for (let i = 0; i < lines.length; i++) {
    if ((lines[i] == 'function' && lines[i].startsWith('var ') || lines[i] === 'else')) {
      linesToCheck.push(i);
      break;
    }
  }

  let currentValue = lines[lineNumber];
  if (currentValue.startsWith('var ')) {
    return linesToCheck.length ? lines[linesToCheck.pop()] : undefined;
  } else {
    return `${getNextValueFromLine(lines, lineNumber)}`;
  }
}

function getLineNumber(currentString) {
  const lastCharIndex = currentString.lastIndexOf('.');
  if (lastCharIndex === -1 || lastCharIndex > 0 && lastCharIndex < currentString.length) {
    return parseInt(lastCharIndex + 1);
  } else {
    return parseInt(currentString.length);
  }
}

function getNextValueFromLineNoSpaces(lines, lineNumber) {
  let currentValue = lines[lineNumber].trim();
  if (currentValue.startsWith('var ')) {
    return `new ${getNextValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(7)))}`;
  } else {
    return `${getNextValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(6)))}\n`;
  }
}

function getCurrentValueFromLine(lines, lineNumber) {
  let currentValue = lines[lineNumber].trim();
  if (currentValue.startsWith('var ')) {
    return `new ${getCurrentValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(7)))}`;
  } else {
    return `${getNextValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(6)))}\n`;
  }
}

function getCurrentValueFromLineNoSpaces(lines, lineNumber) {
  let currentValue = lines[lineNumber].trim();
  if (currentValue.startsWith('var ')) {
    return `new ${getCurrentValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(7)))}`;
  } else {
    return `${getNextValueFromLineNoSpaces(lines, lineNumbers.indexOf(currentValue.substring(6)))}\n`;
  }
}

function isExpression(code) {
  // Add your expression checking logic here
  return true;
}
