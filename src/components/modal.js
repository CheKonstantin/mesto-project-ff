function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.classList.remove('popup_is-animated');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
}
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal };
