import {makeImageElement} from './utils.js';

const template = document.querySelector('#card').content;
const getFeatuersList = (someDocumentElement, announcement) => {
  const listItems = someDocumentElement.querySelectorAll('.popup__feature');
  const featuresList = announcement.offer.features;
  for (let i=0; i < listItems.length; i++){
    let secondClassName = listItems[i].classList[1];

    if (featuresList.indexOf(secondClassName.substr(16)) == -1) {
      listItems[i].remove();
    }
  }
};

const getType = (announcement) => {
  switch(announcement.offer.type){
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
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

export{createPopup};
