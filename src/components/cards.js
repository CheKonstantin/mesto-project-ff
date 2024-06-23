function createCard(cardData, deleteCallback, cardContent) {
  const cardElement = cardContent.querySelector('.card').cloneNode(true);
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

function createNewCard(content, formDomElement, parent) {
  let cardData = {};
  cardData.link = formDomElement.elements.link.value;
  cardData.name = formDomElement.elements.placeName.value;
  const cardElementnNew = createCard(cardData, deleteCard, content);
  parent.prepend(cardElementnNew);
  formDomElement.reset();
}

export { createCard, deleteCard, createNewCard };

