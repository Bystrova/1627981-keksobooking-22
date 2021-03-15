import {makeImageElement} from './utils.js';

const accomodationData = {
  firstItem: {type: 'bungalow', name: 'Бунгало', minPrice: 0},
  secondItem: {type: 'flat', name: 'Квартира', minPrice: 1000},
  thirdItem: {type: 'house', name: 'Дом', minPrice: 5000},
  fourthItem: {type: 'palace', name:'Дворец', minPrice: 10000},
};

const template = document.querySelector('#card').content;
const getFeatuersList = (someDocumentElement, announcement) => {
  const listItems = someDocumentElement.querySelectorAll('.popup__feature');
  const featuresList = announcement.offer.features;
  for (let i=0; i < listItems.length; i++){
    let secondClassName = listItems[i].classList[1];

    if (featuresList.indexOf(secondClassName.substr(16)) === -1) {
      listItems[i].remove();
    }
  }
};

const getType = (announcement) => {
  switch(announcement.offer.type){
    case 'bungalow':
      return accomodationData.firstItem.name;
    case 'flat':
      return accomodationData.secondItem.name;
    case 'house':
      return accomodationData.thirdItem.name;
    case 'palace':
      return accomodationData.fourthItem.name;
  }
};

const makeImageList = (newSimilarElement, announcement) => {
  newSimilarElement.querySelector('.popup__photo').remove();
  const photos = newSimilarElement.querySelector('.popup__photos');
  for (let i = 0; i < announcement.offer.photos.length; i++){
    const photo = makeImageElement('img', 'popup__photo');
    photo.src = announcement.offer.photos[i];
    photo.width='45';
    photo.height='40';
    photo.alt='Фотография жилья';
    photos.appendChild(photo);
  }
};

const createPopup = (announcement) => {
  const newSimilarElement = template.cloneNode(true);
  newSimilarElement.querySelector('.popup__title').textContent = announcement.offer.title;
  newSimilarElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  newSimilarElement.querySelector('.popup__text--price').textContent = announcement.offer.price + ' ₽/ночь';
  newSimilarElement.querySelector('.popup__type').textContent = getType(announcement);
  newSimilarElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  newSimilarElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  newSimilarElement.querySelector('.popup__description').textContent = announcement.offer.description;
  newSimilarElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  getFeatuersList(newSimilarElement, announcement);
  makeImageList(newSimilarElement, announcement);
  return newSimilarElement;
}

export{createPopup, accomodationData};
