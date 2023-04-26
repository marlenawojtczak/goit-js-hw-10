import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchInput = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const clearCountryOutput = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

searchInput.addEventListener(
  `input`,
  debounce(async e => {
    clearCountryOutput();
    const countryName = await fetchCountries(e.target.value.trim());

    if (countryName.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countryName.length > 1 && countryName.length <= 10) {
      clearCountryOutput();
      countryListEl.innerHTML = countryName
        .map(
          country =>
            `<li><img class="country-flag" src="${country.flags.svg}"/><span class="country-name">${country.name.official}</span></li>`
        )
        .join('');
    } else {
      clearCountryOutput();
    }

    if (countryName.length === 1) {
      countryInfoEl.innerHTML = `<img class="country-flag-single" src="${
        countryName[0].flags.svg
      }"/> 
  <p class="country-name-single">${countryName[0].name.official}</p> 
  <p class="country-name-single"><span class="span-info"> Capital: </span> ${
    countryName[0].capital
  }</p> 
  <p class="country-name-single"><span class="span-info"> Population: </span> ${
    countryName[0].population
  }</p> 
  <p class="country-name-single"><span class="span-info"> Languages: </span> ${Object.values(
    countryName[0].languages
  ).join('')}</p>`;
    }
  }, DEBOUNCE_DELAY)
);
