import {makeMarkers, mapFilter} from './map.js';
import {showMessage, getOffDisabled} from './utils.js';

let announcementsArray;

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok){
      response.json().then((similarAnnouncements) => {
        announcementsArray = similarAnnouncements;
        makeMarkers(announcementsArray);
        getOffDisabled(mapFilter);
      })
    } else {
      showMessage('Не удалось загрузить похожие объявления');
    }
  });

const sendData = (onSuccess, onFail, data) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if(response.ok){
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
};

export {announcementsArray, sendData};
