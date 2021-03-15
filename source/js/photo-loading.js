const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const headerPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

const loadPhoto = (photoInput, previewContainer) => {
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((format) => {
      return fileName.endsWith(format);
    });
    if(matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if(previewContainer === headerPreview){
          headerPreview.src = reader.result;
        }  else {
          photoPreview.innerHTML = '';
          const imgTag = document.createElement('img');
          imgTag.setAttribute('width', 70);
          imgTag.setAttribute('heigth', 70);
          imgTag.setAttribute('src', reader.result);
          previewContainer.appendChild(imgTag);
        }
      });
      reader.readAsDataURL(file);
    }
  });
};

loadPhoto(avatarChooser, headerPreview);
loadPhoto(photoChooser, photoPreview);

export {photoPreview, headerPreview};

