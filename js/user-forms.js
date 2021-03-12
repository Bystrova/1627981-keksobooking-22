
import {synchronizeFields, closeMessageByEsc, closeMessageByClick} from './utils.js';
import {address, mainMarker, primaryCoordinates, mapFilter, map, adForm} from './map.js';
import {sendData} from './server-requests.js';

const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const mainContainer = document.querySelector('main');
const avatarChooser = document.querySelector('.ad-form-header__input');
const photoChooser = document.querySelector('.ad-form__input');
const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

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

const changePhoto = (photoInput) => {
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((format) => {
      return fileName.endsWith(format);
    });
    if(!matches) {
      photoInput.setCustomValidity('Загрузите изображение');
    } else {
      photoInput.setCustomValidity('');
    }
    photoInput.reportValidity();
  });
};

changePhoto(avatarChooser);
changePhoto(photoChooser);

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
