import './styles/index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import {
  openModal,
  closeModal,
  editProfile,
  setProfile,
  setModalImg,
} from './components/modal';

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

const imgModal = document.querySelector('.popup.popup_type_image');

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
    setModalImg,
  );
  listCards.append(cardElement);
});

btnAddCard.addEventListener('click', () => {
  openModal(addCardModal);
});

btnEditProfile.addEventListener('click', () => {
  openModal(editProfileModal);
  editProfile(
    formEditName,
    formEditDescription,
    profileName,
    profileDescription,
  );
});

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  setProfile(
    formEditName,
    formEditDescription,
    profileName,
    profileDescription,
  );
  closeModal(formEdit.closest('.popup'));
});

formEdit.addEventListener('input', function () {});

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (
      e.target === modal ||
      e.target === modal.querySelector('.popup__close')
    ) {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  });
});

const cardImgs = document.querySelectorAll('.card__image');

cardImgs.forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal(imgModal);
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
    setModalImg,
  );

  listCards.prepend(newCardElement);

  const newCardImg = newCardElement.querySelector('.card__image');
  newCardImg.addEventListener('click', () => {
    openModal(imgModal);
  });
  formNewCard.reset();
  closeModal(formNewCard.closest('.popup'));
});
