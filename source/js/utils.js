const makeImageElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const getDisabled = (element) => {
  let elementItems = Array.from(element.children);
  elementItems.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  })
};

const getOffDisabled = (element) => {
  let elementItems = Array.from(element.children);
  elementItems.forEach((item) => {
    item.removeAttribute('disabled', 'disabled');
  })
};

const synchronizeFields = (firstField, secondField) => {
  firstField.addEventListener('change', () => {
    for (let i = 0; i < firstField.options.length; i++){
      if(firstField.options[i].selected === true){
        secondField.options[i].selected = true;
      }
    }
  });
};

const showMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '200px auto';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.width = '300px';
  alertContainer.style.height = '150px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

const closeMessage = (message) => {
  const onEscKeydown = (evt) => {
    if(evt.key === ('Escape' || 'Esc')){
      evt.preventDefault();
      message.remove();
      document.removeEventListener('keydown', onEscKeydown);
      document.removeEventListener('click', onClick);
    }
  };
  const onClick = () => {
    message.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onEscKeydown);
  };
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscKeydown);
};

export {makeImageElement, getDisabled, getOffDisabled, showMessage, synchronizeFields, closeMessage};
