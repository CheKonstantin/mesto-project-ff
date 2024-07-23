import { fetchAddLikeCard, fetchDeleteLikeCard } from './api';

function createCard(
  cardData,
  deletePopupCallback,
  cardContent,
  imgModalCallback,
  personalId,
) {
  const cardElement = cardContent.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardBtnDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  //скрываю кнопку удаления если карточка не моя
  if (personalId === cardData.owner._id) {
    cardBtnDelete.addEventListener('click', () => {
      //передаю колбэк для модального окна удаления карточки
      deletePopupCallback(cardData, cardElement);
    });
  } else {
    //удаляю карточку
    cardBtnDelete.remove();
  }

  //установи кол-во лайков

  const counterLikes = (likes) => {
    cardLikeBtn.setAttribute('data-count-likes', likes);
  };

  counterLikes(cardData.likes.length);

  //верни тру если айдишник массива likes, совпадает с моим

  const myLikes = cardData.likes.some(({ _id }) => {
    return _id === personalId;
  });

  //если тру установи активный класс для сердца

  if (myLikes) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  //установи слушатель по клику и вызови функцию likeCard

  cardLikeBtn.addEventListener('click', function (e) {
    likeCard(e.target, cardData, counterLikes);
  });

  //установи слушатель по клику и вызови колбэк для функции setCardPopup
  cardImage.addEventListener('click', () => {
    imgModalCallback(cardData);
  });

  //верни карточку

  return cardElement;
}

// функция установки лайка

function likeCard(button, card, counter) {
  if (button.classList.contains('card__like-button_is-active')) {
    fetchDeleteLikeCard(card)
      .then((data) => {
        button.classList.remove('card__like-button_is-active');
        counter(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    fetchAddLikeCard(card)
      .then((data) => {
        counter(data.likes.length);
        button.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard };

