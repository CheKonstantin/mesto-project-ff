const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-19/',
  headers: {
    authorization: '6a342d60-ff1d-4edc-b45a-cc4b20a093f2',
    'Content-Type': 'application/json',
  },
};

// запроси карточки с сервера

function fetchRequestCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запроси вывести данные профиля с сервера

function fetchRequestProfile() {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на обновление данных профиля с сервера

function fetchUpdateProfileData(objProfile) {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: objProfile.name,
      about: objProfile.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на добавление карточки на сервер

function fetchAddNewCard(cardData) {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на удаление карточки с сервера

function fetchRemoveCard(data) {
  return fetch(`${config.baseUrl}cards/${data._id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на добавление лайка на сервере

function fetchAddLikeCard(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на удаление лайка с сервера

function fetchDeleteLikeCard(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// запрос на обновление аватара с сервера

function fetchUpdateAvatarProfile(profile) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,

    body: JSON.stringify({
      avatar: profile.avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {
  fetchRequestCards,
  fetchRequestProfile,
  fetchUpdateProfileData,
  fetchAddNewCard,
  fetchRemoveCard,
  fetchAddLikeCard,
  fetchDeleteLikeCard,
  fetchUpdateAvatarProfile,
};
