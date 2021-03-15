/* global _:readonly */
import {makeMarkers, mapFilter} from './map.js';
import {announcementsArray} from './server-requests.js';

const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MAKE_MARKERS_DELAY = 500;
const DEFAULT_VALUE = 'any';
const prices = {low: {min: 0, max: 10000}, middle: {min: 10000, max: 50000}, high: {min: 50000, max: 100500000000}};

const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

const isChoosen = (announcement) => {
  const checkedCheckboxes = Array.from(document.querySelectorAll('.map__checkbox:checked'));
  const priceInterval = prices[housingPrice.value];
  let isFiltered = true;
  if(housingType.value !== DEFAULT_VALUE && announcement.offer.type !== housingType.value){
    isFiltered = false;
  } else if(housingPrice.value !== DEFAULT_VALUE && !(announcement.offer.price >= priceInterval.min && announcement.offer.price <= priceInterval.max)){
    isFiltered = false;
  } else if(housingRooms.value !== DEFAULT_VALUE && announcement.offer.rooms.toString() !== housingRooms.value){
    isFiltered = false;
  } else if(housingGuests.value !== DEFAULT_VALUE && announcement.offer.guests.toString() !== housingGuests.value){
    isFiltered = false;
  } else {
    checkedCheckboxes.forEach((checkbox) => {
      if (!announcement.offer.features.includes(checkbox.value, 0)) {
        isFiltered = false;
      }
    })
  }
  return isFiltered
};

const makeMarkersDebounce = _.debounce((evt) => {
  if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')){
    const filteredArray = announcementsArray.filter(announcement => isChoosen(announcement));
    filteredArray
      .slice(0, SIMILAR_ANNOUNCEMENT_COUNT);

    makeMarkers(filteredArray);
  }
}, MAKE_MARKERS_DELAY);

mapFilter.addEventListener('change', (evt) => {
  makeMarkersDebounce(evt);
});
