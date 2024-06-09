// @todo: Темплейт карточки
const cardElementContent = document.querySelector('#card-template').content;
// @todo: DOM узлы
const listCards = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(arr, parent) {
  arr.forEach((element) => {
    const cardTemplate = cardElementContent
        .querySelector('.card')
        .cloneNode(true),
      cardImage = cardTemplate.querySelector('.card__image'),
      cardBtnDelete = cardTemplate.querySelector('.card__delete-button'),
      cardTitle = cardTemplate.querySelector('.card__title');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;
    parent.append(cardTemplate);
    cardBtnDelete.addEventListener('click', (e) => {
      deleteCard(e.target);
    });
  });
}
// @todo: Функция удаления карточки
function deleteCard(event) {
  event.parentNode.remove();
}
// @todo: Вывести карточки на страницу
createCard(initialCards, listCards);

