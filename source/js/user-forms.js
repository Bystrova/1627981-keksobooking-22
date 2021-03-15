
import {synchronizeFields, closeMessage} from './utils.js';
import {address, mainMarker, primaryCoordinates, mapFilter, map, adForm, makeMarkers} from './map.js';
import {sendData, announcementsArray} from './server-requests.js';
import {accomodationData} from './popup.js';
import {photoPreview, headerPreview} from './photo-loading.js';

const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const mainContainer = document.querySelector('main');
const defaultPicture = headerPreview.src;


houseType.addEventListener('change', () => {
  if(houseType.value === accomodationData.firstItem.type){
    price.setAttribute('min', accomodationData.firstItem.minPrice);
  } else if(houseType.value === accomodationData.secondItem.type) {
    price.setAttribute('min', accomodationData.secondItem.minPrice);
  } else if(houseType.value === accomodationData.thirdItem.type) {
    price.setAttribute('min', accomodationData.thirdItem.minPrice);
  } else if(houseType.value === accomodationData.fourthItem.type) {
    price.setAttribute('min', accomodationData.fourthItem.minPrice);
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
  closeMessage(successMessage);
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
  closeMessage(errorMessage);
};

const clearForm = () => {
  adForm.reset();
  mapFilter.reset();
  address.value = primaryCoordinates;
  mainMarker.setLatLng([primaryCoordinates[0], primaryCoordinates[1]]);
  map.setView([primaryCoordinates[0], primaryCoordinates[1]], 10);
  photoPreview.innerHTML = '';
  headerPreview.src = defaultPicture;
  makeMarkers(announcementsArray);
};

const showMessageAndClear = () => {
  showSuccessMessage();
  clearForm();
}

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
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
