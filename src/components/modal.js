function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeByEscape);
}
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    console.log(event);
    
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export { openModal, closeModal };
