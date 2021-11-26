/* eslint-disable prettier/prettier */
import { Config } from '../Config'
import { currentLocale } from '../Utils/Utils';

const fetchWithTimeout = (url, options, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(resolve).catch(reject);

    if (timeout) {
      const e = { errors: [{ details: 'timeouterror' }] };
      setTimeout(reject, timeout, e);
    }
  });
};

class ApiService {
  static getWithTimeout(authKey, path, urlParams, timeout) {
    return fetchWithTimeout(
      `${Config.API_URL}${path}${urlParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': currentLocale(),
          Authorization: 'Bearer ' + authKey,
        },
      },
      timeout,
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static get(authKey, path, urlParams) {
    return fetch(`${Config.API_URL}${path}${urlParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale(),
        Authorization: 'Bearer ' + authKey,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static post(authKey, path, requestBody) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale(),
        Authorization: 'Bearer ' + authKey,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static put(authKey, path, requestBody) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale(),
        Authorization: 'Bearer ' + authKey,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static patch(authKey, path, requestBody) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale(),
        Authorization: 'Bearer ' + authKey,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Erreur: ', response.status, response.statusText);
          return;
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static put_image(authKey, path, data) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + authKey,
        'Accept-Language': currentLocale(),
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(_response => {
        if (_response.ok) {
          return _response.json();
        } else {
          console.log('Erreur: ', _response);
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static post_image(authKey, path, data) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Accept-Language': currentLocale(),
        Authorization: 'Bearer ' + authKey,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(_response => {
        if (_response.ok) {
          return _response.json();
        } else {
          console.log('Erreur: ', _response);
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }

  static delete(authKey, path, requestBody) {
    return fetch(`${Config.API_URL}${path}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Accept-Language': currentLocale(),
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authKey,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Erreur: ', response.status, response.statusText);
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        return error;
      });
  }
}
export default ApiService;
