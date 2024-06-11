const cardElementContent = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');

function createCard(cardData, deleteCallback) {
  const cardElement = cardElementContent
    .querySelector('.card')
    .cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardBtnDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardBtnDelete.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  listCards.append(cardElement);
});


