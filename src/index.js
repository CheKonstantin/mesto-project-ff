import './styles/index.css';
import { createCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  fetchRequestCards,
  fetchRequestProfile,
  fetchUpdateProfileData,
  fetchAddNewCard,
  fetchRemoveCard,
  fetchUpdateAvatarProfile,
} from './components/api';

// содержимое шаблона карточки
const cardElementContent = document.querySelector('#card-template').content;

// кнопки
const btnAddCard = document.querySelector('.profile__add-button');
const btnEditProfile = document.querySelector('.profile__edit-button');

//модалки
const modals = document.querySelectorAll('.popup');
const addCardModal = document.querySelector('.popup.popup_type_new-card');
const editProfileModal = document.querySelector('.popup.popup_type_edit');
const imgModal = document.querySelector('.popup.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup.popup_type_avatar');
const deleteCardPopup = document.querySelector('.popup.popup_type_delete-card');

//формы
const editProfileForm = editProfileModal.querySelector('.popup__form');
const deleteCardPopupForm = deleteCardPopup.querySelector('.popup__form');
const formUpdateAvatar = document.forms.updateAvatar;
const formEdit = document.forms.editProfile;
const formNewCard = document.forms.newPlace;

//элементы форм
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const inputUpdateAvatar = formUpdateAvatar.elements.avatar;

// разные дом элементы
const listCards = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imgModalTagImg = imgModal.querySelector('.popup__image');
const imgModalCaption = imgModal.querySelector('.popup__caption');
const profileAvatar = document.querySelector('.profile__image');

//вспомогательные переменные

const promises = [fetchRequestCards(), fetchRequestProfile()];
let profileId;
let cardRemove;
let cardElementRemove;

//конфиг для валидации

const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//валидация форм

enableValidation(configValidate);

// форма новой карточки: очистка валидации, сброс формы и открытие модалки

btnAddCard.addEventListener('click', () => {
  clearValidation(addCardModal, configValidate);
  formNewCard.reset();
  openModal(addCardModal);
});

// форма профиля: очистка валидации, открытие модалки и установка инпутов

btnEditProfile.addEventListener('click', () => {
  clearValidation(editProfileModal, configValidate);
  openModal(editProfileModal);
  formEditName.value = profileName.textContent;
  formEditDescription.value = profileDescription.textContent;
});

// закрытие модалок по мисклику и кнопке

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

// установка пропсов в значение попапа изображение и его открытие

function setCardPopup(data) {
  imgModalTagImg.src = data.link;
  imgModalTagImg.alt = data.name;
  imgModalCaption.textContent = data.name;
  openModal(imgModal);
}

// инициализируй дату для карт с сервера

function initialServerCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      openDeleteCardPopup,
      cardElementContent,
      setCardPopup,
      profileId,
    );
    listCards.append(cardElement);
  });
}

// инициализируй профиль с сервера

function initialServerProfile(info) {
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
  setAvatar(info.avatar);
}

// обнови профиль на сервере

function updateServerProfileInfo() {
  const info = {
    name: formEditName.value,
    about: formEditDescription.value,
  };
  //установи лоадер
  setLoading(true, editProfileModal);

  fetchUpdateProfileData(info)
    .then((profile) => {
      initialServerProfile(profile);
      closeModal(editProfileModal);
      editProfileForm.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      //удали лоадер
      setLoading(false, editProfileModal);
    });
}

// фун-я для добавления новой карточки на сервер

function addNewCardOnServer() {
  const cardData = {
    name: formNewCard.elements.placeName.value,
    link: formNewCard.elements.link.value,
  };
  setLoading(true, addCardModal);
  fetchAddNewCard(cardData)
    .then((res) => {
      listCards.prepend(
        createCard(
          res,
          openDeleteCardPopup,
          cardElementContent,
          setCardPopup,
          profileId,
        ),
      );
      closeModal(formNewCard.closest('.popup'));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false, addCardModal);
    });
}

//функция открытия модалки удаления карточки
//передаю агрументы глобальным переменным для использования извне
//открываю модалку

function openDeleteCardPopup(card, cardElement) {
  cardRemove = card;
  cardElementRemove = cardElement;
  openModal(deleteCardPopup);
}

// удаляю фечом с сервера
// удаляю из разметки карточку
// закрываю модалку удаления карточки

function deleteCardServer(card, cardElement) {
  setLoading(true, deleteCardPopup);
  fetchRemoveCard(card)
    .then(() => {
      cardElement.remove();
      closeModal(deleteCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, deleteCardPopup);
    });
}

//функция для обнавления аватара на сервере

function updateAvatarOnServer(e) {
  e.preventDefault();
  setLoading(true, popupUpdateAvatar);

  const avatarUrl = {
    avatar: inputUpdateAvatar.value,
  };

  fetchUpdateAvatarProfile(avatarUrl)
    .then((data) => {
      setAvatar(data.avatar);
      closeModal(popupUpdateAvatar);
      formUpdateAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false, popupUpdateAvatar);
    });
}

//фун-ия для установки аватара в дом
function setAvatar(data) {
  profileAvatar.style.backgroundImage = `url(${data})`;
}

//фун-ия для установки лоадера

function setLoading(load, popup) {
  const btn = popup.querySelector('.popup__button');
  if (load) {
    console.log('Сохранение...');

    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохранить';
    console.log('Сохранить...');
  }
}

// оптравь форму для обновления профиля и закрой модалку

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  updateServerProfileInfo();
});

// оптравь форму для добавления карточки

formNewCard.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewCardOnServer();
});

// оптравь форму для удаления карточки

deleteCardPopupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  deleteCardServer(cardRemove, cardElementRemove);
});

// оптравь форму для обновления аватара

formUpdateAvatar.addEventListener('submit', function (e) {
  updateAvatarOnServer(e);
});

// по клику на аватар, очисти ошибки валидации, открой модалку

profileAvatar.addEventListener('click', function (e) {
  e.stopPropagation();
  clearValidation(formUpdateAvatar, configValidate);
  openModal(popupUpdateAvatar);
});

// инициализируем карты и профиль за раз

Promise.all(promises)
  .then(([cards, profile]) => {
    profileId = profile._id;
    initialServerProfile(profile);
    initialServerCards(cards);
  })
  .catch((error) => {
    console.log(error);
  });
