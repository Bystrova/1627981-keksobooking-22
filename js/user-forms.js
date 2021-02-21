const houseType = document.querySelector('#type');
const price = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

houseType.addEventListener('change', function(){
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


const synchronizeFields = (firstField, secondField) => {
  firstField.addEventListener('change', function(){
    for (let i = 0; i < firstField.options.length; i++){
      if(firstField.options[i].selected == true){
        secondField.options[i].selected = true;
      }
    }
  });
};

synchronizeFields(checkIn, checkOut);
synchronizeFields(checkOut, checkIn);

