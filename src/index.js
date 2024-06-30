import './styles/index.css';
import { createCard } from './components/card';
import { openModal, closeModal } from './components/modal';

import { initialCards } from './components/cards';

const cardElementContent = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');
const btnAddCard = document.querySelector('.profile__add-button');
const btnEditProfile = document.querySelector('.profile__edit-button');
const addCardModal = document.querySelector('.popup.popup_type_new-card');
const editProfileModal = document.querySelector('.popup.popup_type_edit');
const modals = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export const imgModal = document.querySelector('.popup.popup_type_image');
export const imgModalTagImg = imgModal.querySelector('.popup__image');
export const imgModalCaption = imgModal.querySelector('.popup__caption');

const formEdit = document.forms.editProfile;
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;

const formNewCard = document.forms.newPlace;

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    deleteCard,
    cardElementContent,
    likeCard,
    setCardPopup,
  );
  listCards.append(cardElement);
});

btnAddCard.addEventListener('click', () => {
  openModal(addCardModal);
});

btnEditProfile.addEventListener('click', () => {
  openModal(editProfileModal);

  formEditName.value = profileName.textContent;
  formEditDescription.value = profileDescription.textContent;
});

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();

  profileName.textContent = formEditName.value;
  profileDescription.textContent = formEditDescription.value;

  closeModal(formEdit.closest('.popup'));
});

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (
      e.target === modal ||
      e.target === modal.querySelector('.popup__close')
    ) {
      closeModal(modal);
    }
  });
});

formNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const cardData = {
    link: formNewCard.elements.link.value,
    name: formNewCard.elements.placeName.value,
  };

  const newCardElement = createCard(
    cardData,
    deleteCard,
    cardElementContent,
    likeCard,
    setCardPopup,
  );

  listCards.prepend(newCardElement);
  formNewCard.reset();
  closeModal(formNewCard.closest('.popup'));
});

function setCardPopup(data) {
  imgModalTagImg.src = data.link;
  imgModalTagImg.alt = data.name;
  imgModalCaption.textContent = data.name;
  openModal(imgModal);
}

function likeCard(btnItem) {
  btnItem.classList.toggle('card__like-button_is-active');
}

function deleteCard(cardElement) {
  cardElement.remove();
}
