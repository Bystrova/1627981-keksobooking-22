import {getDisabled, getOffDisabled} from './utils.js';
import {createPopup} from './popup.js';

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const address = document.querySelector('#address');
const primaryCoordinates = [35.6894, 139.692]

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
    address.value = primaryCoordinates;
  })
  .setView({
    lat: primaryCoordinates[0],
    lng: primaryCoordinates[1],
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
    lat: primaryCoordinates[0],
    lng: primaryCoordinates[1],
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

const markers = [];
const makeMarkers = (similarAnnouncements) => {
  markers.forEach((marker) => {
    marker.remove();
  });
  similarAnnouncements.forEach((announcement) => {
    const simpleMarkerImg = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const lat = announcement.location.lat;
    const lng = announcement.location.lng;

    const simpleMarker = L.marker({
      lat,
      lng,
    },
    {
      icon: simpleMarkerImg,
    });

    simpleMarker
      .addTo(map)
      .bindPopup(createPopup(announcement).firstElementChild);

    markers.push(simpleMarker);
  });

};

export{map, makeMarkers, adForm, address, primaryCoordinates, mapFilter, mainMarker, markers};
