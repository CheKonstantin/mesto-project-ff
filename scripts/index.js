const cardElementContent = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');

function createCard(cardData, deleteCallback) {
  const cardTemplate = cardElementContent
    .querySelector('.card')
    .cloneNode(true);

  const cardImage = cardTemplate.querySelector('.card__image');
  const cardBtnDelete = cardTemplate.querySelector('.card__delete-button');
  const cardTitle = cardTemplate.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardBtnDelete.addEventListener('click', () => {
    deleteCallback(cardTemplate);
  });

  return cardTemplate;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

const initialCards = [
  // Список ваших начальных карточек
];

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  listCards.append(cardElement);
});
// const cardElementContent = document.querySelector('#card-template').content;
// // @todo: DOM узлы
// const listCards = document.querySelector('.places__list');
// // @todo: Функция создания карточки
// function createCard(arr, parent) {
//   arr.forEach((element) => {
//     const cardTemplate = cardElementContent
//         .querySelector('.card')
//         .cloneNode(true),
//       cardImage = cardTemplate.querySelector('.card__image'),
//       cardBtnDelete = cardTemplate.querySelector('.card__delete-button'),
//       cardTitle = cardTemplate.querySelector('.card__title');
//     cardImage.src = element.link;
//     cardImage.alt = element.name;
//     cardTitle.textContent = element.name;
//     parent.append(cardTemplate);
//     cardBtnDelete.addEventListener('click', (e) => {
//       deleteCard(e.target);
//     });
//   });
// }
// // @todo: Функция удаления карточки
// function deleteCard(event) {
//   event.parentNode.remove();
// }
// // @todo: Вывести карточки на страницу
// createCard(initialCards, listCards);

