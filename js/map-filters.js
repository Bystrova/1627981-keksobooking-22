/* global _:readonly */
import {makeMarkers, mapFilter} from './map.js';
import {announcementsArray} from './server-requests.js';

const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MAKE_MARKERS_DELAY = 500;

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
