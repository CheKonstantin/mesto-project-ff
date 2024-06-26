const imgModal = document.querySelector('.popup.popup_type_image');
const imgModalTagImg = imgModal.querySelector('.popup__image');
const imgModalCaption = imgModal.querySelector('.popup__caption');

function createCard(
  cardData,
  deleteCallback,
  cardContent,
  likeCallback,
  imgModalCallback,
) {
  const cardElement = cardContent.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardBtnDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardBtnDelete.addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  cardBtnDelete.removeEventListener('click', () => {
    deleteCallback(cardElement);
  });

  cardLikeBtn.addEventListener('click', () => {
    likeCallback(cardLikeBtn);
  });

  cardImage.addEventListener('click', () => {
    imgModalCallback(imgModalTagImg, imgModalCaption, cardData);
  });

  return cardElement;
}

function likeCard(btnItem) {
  btnItem.classList.toggle('card__like-button_is-active');
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard, likeCard };

