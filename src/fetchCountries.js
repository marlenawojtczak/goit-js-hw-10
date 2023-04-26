import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(
    `${API_URL}${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
};
