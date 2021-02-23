import {getDisabled, getOffDisabled} from './utils.js';
import {similarAnnouncements, newPopup} from './popup.js';

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const address = document.querySelector('#address');

address.setAttribute('readonly', 'readonly');
adForm.classList.add('ad-form--disabled');
mapFilter.classList.add('map__filters--disabled');
getDisabled(adForm);
getDisabled(mapFilter);


/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    getOffDisabled(adForm);
    getOffDisabled(mapFilter);
    address.value = [35.6894, 139.692]
  })
  .setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerImg = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: markerImg,
  },
);
mainMarker.addTo(map);

mainMarker.on('drag', (evt) => {
  const coordinates = Object.values(evt.target.getLatLng());
  address.value = [(coordinates[0]).toFixed(5), (coordinates[1]).toFixed(5)]
});

similarAnnouncements.forEach((announcement) => {
  const simpleMarkerImg = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const lat = announcement.location.x;
  const lng = announcement.location.y;

  const simpleMarker = L.marker({
    lat,
    lng,
  },
  {
    icon: simpleMarkerImg,
  });

  simpleMarker
    .addTo(map)
    .bindPopup(newPopup(announcement));
});

export{map};
