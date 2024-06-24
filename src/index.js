import './styles/index.css';
import {
  createCard,
  deleteCard,
  addNewCard,
  likeCard,
} from './components/cards';
import {
  openModal,
  closeModal,
  editProfile,
  setProfile,
} from './components/modal';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const cardElementContent = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');
const btnAddCard = document.querySelector('.profile__add-button');
const btnEditProfile = document.querySelector('.profile__edit-button');
const addCardModal = document.querySelector('.popup.popup_type_new-card');
const editProfileModal = document.querySelector('.popup.popup_type_edit');
const imgModal = document.querySelector('.popup.popup_type_image');
const modals = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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
  addNewCard(
    formNewCard,
    cardElementContent,
    openModal,
    imgModal,
    listCards,
    likeCard,
  );

  closeModal(formNewCard.closest('.popup'));
});
