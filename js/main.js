'use strict';

const TITLES = [
  'Совдеповская халупа',
  'Роскошная хижина',
  'Домик Барби',
  'Коробка-студия из-под холодильника',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Только для курящих, с детьми и животными. Отсутствие гражданства РФ приветствуется.',
  'Подходит для организации подпольного казино или наркопритона.',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


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
const getAuthor = () => {
  return  {avatar: 'img/avatars/user' + 0 + getRandomInteger(0, 8) + '.png'};
};

const getOffer = () => {
  return {
    title: getRandomElement(TITLES),
    address:  Object.values(getLocation()),
    price: getRandomInteger(1000, 1000000000),
    type: getRandomElement(TYPES),
    rooms: getRandomInteger(1, 100),
    guests: getRandomInteger(1, 100),
    checkin: getRandomElement(CHECKIN_HOURS),
    checkout: getRandomElement(CHECKOUT_HOURS),
    features: getUniqueArr(FEATURES),
    description: getRandomElement(DESCRIPTIONS) ,
    photos: getUniqueArr(PHOTOS),
  };
};

const getLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  }
};

const getTotalObject = () => {
  return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  }
}
const similarAnnouncement = new Array(10).fill(null).map(() => getTotalObject());
similarAnnouncement;

