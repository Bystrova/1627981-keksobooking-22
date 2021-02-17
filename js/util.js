const getRandomInteger = (firstIndex, secondIndex) => {
  let randomIndex = Math.floor(Math.random()*(secondIndex - firstIndex + 1) + firstIndex);
  if (secondIndex - firstIndex < 0){
    return 'Диапазон может быть только положительным';
  }
  return randomIndex;
}

const getRandomFloat = (firstNumber, secondNumber, decimalPoint) => {
  let randomNumber = Math.random()*(secondNumber - firstNumber + Math.pow(0.1, decimalPoint)) + firstNumber;
  if (secondNumber - firstNumber < 0){
    return 'Диапазон может быть только положительным';
  }
  return Number(randomNumber.toFixed(decimalPoint));
}

const getUniqueArr = (someArray) => {
  let uniqueArr = [];
  for (let i=0; i <= getRandomInteger(0, someArray.length-1); i++){
    let uniqueIndex = getRandomInteger(0, someArray.length-1);
    if (uniqueArr.indexOf(someArray[uniqueIndex]) == -1){
      uniqueArr.push(someArray[uniqueIndex]);
    }
  }
  return uniqueArr;
};

const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length-1)];
};

export {getRandomInteger, getRandomFloat, getUniqueArr, getRandomElement}
