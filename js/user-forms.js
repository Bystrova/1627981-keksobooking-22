import {synchronizeFields} from './utils.js';
import {address, mainMarker, primaryCoordinates, mapFilter, map, adForm, markers, makeMarkers} from './map.js';
import {announcementsArray} from './server-requests.js';

const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const title = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

const housingType = mapFilter.querySelector('#housing-type');
housingType.addEventListener('change', () => {
  markers.forEach((marker) => {
    marker.remove();
  });
  if (housingType.value !== 'any'){
    const sortedSimilarAnnouncements = announcementsArray.filter(announcement => announcement.offer.type === housingType.value);
    makeMarkers(sortedSimilarAnnouncements);
  } else {
    makeMarkers(announcementsArray);
  }

});

title.addEventListener('input', () => {
  const valueLength = title.value.length;
  if (valueLength < MIN_TITLE_LENGTH){
    title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Удалите лишние ' + (MAX_TITLE_LENGTH - valueLength) + ' симв.')
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
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
  return result;
};

const checkCapacity = (userField) => {
  userField.addEventListener('click', () => {
    checkCorrectChoice();
  })
};

checkCapacity(capacity);
checkCapacity(roomNumber);

export {clearForm, checkCorrectChoice};
