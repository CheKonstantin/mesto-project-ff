function createCard(cardData, deleteCallback, cardContent, likeCallback) {
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

  cardLikeBtn.addEventListener('click', (e) => {
    likeCallback(cardLikeBtn);
  });

  return cardElement;
}

function likeCard(btnItem) {
  btnItem.classList.toggle('card__like-button_is-active');
}

function addNewCard(
  form,
  cardContent,
  openModal,
  imgModal,
  parent,
  likeCallback,
) {
  const newCardData = {
    link: form.elements.link.value,
    name: form.elements.placeName.value,
  };
  const newCardElement = createCard(newCardData, deleteCard, cardContent);
  parent.prepend(newCardElement);

  const newCardImg = newCardElement.querySelector('.card__image');
  const newCardLikeBtn = newCardElement.querySelector('.card__like-button');
  newCardImg.addEventListener('click', () => {
    openModal(imgModal);
  });
  newCardImg.removeEventListener('click', () => {
    openModal(imgModal);
  });

  newCardLikeBtn.addEventListener('click', () => {
    // likeCallback(newCardLikeBtn);
    console.log(newCardLikeBtn);
  });

  form.reset();
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard, addNewCard, likeCard };

