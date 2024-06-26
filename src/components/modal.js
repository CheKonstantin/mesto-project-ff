function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.remove('popup_is-animated');
  document.body.style.overflow = 'hidden';
  modal.removeEventListener('click', () => {
    openModal(modal);
  });
}
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.body.style.overflow = '';
  modal.removeEventListener('click', () => {
    closeModal(modal);
  });
}

function editProfile(inputTitle, inputDescr, titleField, descrField) {
  inputTitle.value = titleField.textContent;
  inputDescr.value = descrField.textContent;
}

function setProfile(inputTitle, inputDescr, titleField, descrField) {
  titleField.textContent = inputTitle.value;
  descrField.textContent = inputDescr.value;
}

function setModalImg(imgElem, text, data) {
  imgElem.src = data.link;
  imgElem.alt = data.name;
  text.textContent = data.name;
}

export { openModal, closeModal, editProfile, setProfile, setModalImg };
