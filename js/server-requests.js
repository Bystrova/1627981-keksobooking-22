import {makeMarkers, adForm, mapFilter} from './map.js';
import {showMessage, closeMessageByEsc, closeMessageByClick, getOffDisabled} from './utils.js';
import {clearForm} from './user-forms.js';

const mainContainer = document.querySelector('main');
const SIMILAR_ANNOUNCEMENT_COUNT = 10;

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

let announcementsArray;

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok){
      response.json().then((similarAnnouncements) => {
        announcementsArray = similarAnnouncements.slice(0, SIMILAR_ANNOUNCEMENT_COUNT);
        makeMarkers(announcementsArray);
        getOffDisabled(mapFilter);
      })
    } else {
      showMessage('Не удалось загрузить похожие объявления');
    }
  });

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if(response.ok){
        showSuccessMessage();
        clearForm();
      } else {
        showErrorMessage();
      }

    })
    .catch(() => {
      showErrorMessage();
    })
});

export {announcementsArray};
