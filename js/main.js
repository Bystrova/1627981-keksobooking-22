'use strict';

const getRandomInteger = (firstNumber, secondNumber) => {
  // подсмотрено тут https://myrusakov.ru/js-random-numbers.html
  let randomNumber = Math.floor(Math.random()*(secondNumber - firstNumber + 1) + firstNumber);
  if (firstNumber < 0 || secondNumber < 0){
    return 'Диапазон может быть только положительным';
  }
  return randomNumber;
}
getRandomInteger();

const getRandomFloat = (firstNumber, secondNumber, decimalPoint) => {
  let randomNumber = Math.random()*(secondNumber - firstNumber + 0.0000000001) + firstNumber;
  if (firstNumber < 0 || secondNumber < 0){
    return 'Диапазон может быть только положительным';
  }
  return Number(randomNumber.toFixed(decimalPoint));
}
getRandomFloat();
