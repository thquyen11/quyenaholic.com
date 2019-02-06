const specialCharInputHandle = (userInput: string, storeInput: string, operators: string[]) => {
  if (userInput === "clear") {
    return "0";
  } else if (userInput === "undo") {
    if (storeInput.length === 1 && storeInput !== "0") {
      return "0";
    }
    const undoInput = storeInput.slice(0, storeInput.length - 1);
    return undoInput;
  } else if (userInput === "=") {
    const lastChar: string = storeInput.slice(storeInput.length - 1);
    let toCalculate: string = storeInput;
    if (lastChar === "." || operators.indexOf(lastChar) !== -1) {
      toCalculate = storeInput.slice(0, storeInput.length - 1);
    }
    toCalculate = eval(toCalculate).toString();
    return toCalculate;
  }

  return "";
}

const inputHandler = (userInput: string, storeInput: string, maxDigit: number) => {
  const operators: string[] = ["+", "-", "*", "/"];

  // when storeInput length < 30 characters
  if (storeInput.length < maxDigit) {
    if (storeInput === "0") {
      if (userInput === ".") {
        return "0.";
      } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(userInput) !== -1) {
        return userInput;
      }
      return "";
    } else {
      if (userInput === "clear" || userInput === "undo" || userInput === "=") {
        return specialCharInputHandle(userInput, storeInput, operators);
      }
      else {
        const lastChar: string = storeInput.slice(0, storeInput.length - 1);
        if (lastChar === "." || operators.indexOf(lastChar) !== -1) {
          if (userInput !== "." && operators.indexOf(userInput) !== -1) {
            return storeInput + userInput
          }
        }
        return storeInput + userInput
      }
    }
  }
  // when storeInput length == 30 characters
  if (userInput === "clear" || userInput === "undo" || userInput === "=") {
    return specialCharInputHandle(userInput, storeInput, operators);
  }

  return "";
}

export default inputHandler;