/* global _:readonly */
import {synchronizeFields, closeMessageByEsc, closeMessageByClick} from './utils.js';
import {address, mainMarker, primaryCoordinates, mapFilter, map, adForm, makeMarkers} from './map.js';
import {announcementsArray, sendData} from './server-requests.js';

const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const mainContainer = document.querySelector('main');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MAKE_MARKERS_DELAY = 500;


houseType.addEventListener('change', () => {
  price.value = '';
  if(houseType.value === 'bungalow'){
    price.min = 0;
  } else if(houseType.value === 'flat') {
    price.min = 1000;
  } else if(houseType.value === 'house') {
    price.min = 5000;
  } else if(houseType.value === 'palace') {
    price.min = 10000;
  }
  price.placeholder = price.min;
});

synchronizeFields(checkIn, checkOut);
synchronizeFields(checkOut, checkIn);

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successMessageContainer = successTemplate.querySelector('.success');
  const successMessage = successMessageContainer.cloneNode(true);
  successMessage.style.zIndex = 1000;
  mainContainer.append(successMessage);
  closeMessageByEsc(successMessage);
  closeMessageByClick(successMessage);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorMessageContainer = errorTemplate.querySelector('.error');
  const errorMessage = errorMessageContainer.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorMessage.style.zIndex = 1000;
  mainContainer.append(errorMessage);

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
  closeMessageByEsc(errorMessage);
  closeMessageByClick(errorMessage);
};

const clearForm = () => {
  adForm.reset();
  mapFilter.reset();
  address.value = primaryCoordinates;
  mainMarker.setLatLng([primaryCoordinates[0], primaryCoordinates[1]]);
  map.setView([primaryCoordinates[0], primaryCoordinates[1]], 10);
};

const showMessageAndClear = () => {
  showSuccessMessage();
  clearForm();
}

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

const getRank = (announcement) => {
  const prices = {low: {max: 10000}, middle: {min: 10000, max: 50000}, high: {min: 50000}, any: {min: 0}};
  const priceInterval = prices[housingPrice.value];
  let rank = 0;
  if(announcement.offer.type === housingType.value){
    rank += 5;
  }
  if(announcement.offer.price >= priceInterval.min && announcement.offer.price <= priceInterval.max) {
    rank += 4;
  }
  if(announcement.offer.rooms.toString() === housingRooms.value) {
    rank += 3;
  }
  if(announcement.offer.guests.toString() === housingGuests.value) {
    rank += 2;
  }
  const checkedCheckboxes = Array.from(document.querySelectorAll('.map__checkbox:checked'));
  checkedCheckboxes.forEach((checkbox) => {
    if (announcement.offer.features.includes(checkbox.value, 0)) {
      rank += 1;
    }
  });
  return rank;
};

const sortAnnouncements = (announcementA, announcementB) => {
  const rankA = getRank(announcementA);
  const rankB = getRank(announcementB);
  return rankB - rankA;
};

const makeMarkersDebounce = _.debounce((evt) => {
  if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')){
    const sortedArray = announcementsArray
      .slice()
      .sort(sortAnnouncements)
      .slice(0, SIMILAR_ANNOUNCEMENT_COUNT);

    makeMarkers(sortedArray);
  }
}, MAKE_MARKERS_DELAY);

mapFilter.addEventListener('change', (evt) => {
  makeMarkersDebounce(evt);
});

const checkCorrectChoice = () => {
  let result = true;
  if(roomNumber.value === '1' && capacity.value !== '1'){
    result = capacity.setCustomValidity('Одна комната подходит только для одного гостя');
  } else if(roomNumber.value === '100' && capacity.value !== '0'){
    result = capacity.setCustomValidity('Жирновато для гостей');
  } else if(roomNumber.value === '2' && (capacity.value === '0' || capacity.value === '3')){
    result = capacity.setCustomValidity('Две комнаты подходят для одного или двух гостей');
  } else if(roomNumber.value === '3' && capacity.value === '0'){
    result = capacity.setCustomValidity('Три комнаты подходят для одного, двух или трёх гостей');
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
  return result;
};

const checkCapacity = (userField) => {
  userField.addEventListener('change', () => {
    capacity.setCustomValidity('');
  })
};
checkCapacity(capacity);
checkCapacity(roomNumber);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkCorrectChoice()) {
    const formData = new FormData(evt.target);
    sendData(
      () => showMessageAndClear(),
      () => showErrorMessage(),
      formData);
  }
});

export {clearForm};
