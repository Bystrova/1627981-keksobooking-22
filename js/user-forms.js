import {synchronizeFields} from './utils.js';
import {address, mainMarker, primaryCoordinates, mapFilter, map, adForm} from './map.js';

const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');

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

const clearForm = () => {
  adForm.reset();
  mapFilter.reset();
  address.value = primaryCoordinates;
  mainMarker.setLatLng([primaryCoordinates[0], primaryCoordinates[1]]);
  map.setView([primaryCoordinates[0], primaryCoordinates[1]], 10);
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

export {clearForm};
