import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
//const BASE_URL = 'https://restcountries.com/v3.1';

const refs = {
    inputEl: document.querySelector(`#search-box`),
    listEl: document.querySelector(`.country-list`),
    infoEl: document.querySelector(`.country-info`)
};
console.log(refs.listEl);

refs.inputEl.addEventListener('input', debounce(fetchCountries, 3000));


   
fetchCountries()
.then(renderContriesList)
.catch(error => {
    Notify.info('Oops, there is no country with that name');
}).finally(() => console.log('hi')); 

let name = "per";

function fetchCountries(name) {
   
   return fetch('https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages')
   .then(response => {
       return response.json();
   });   
};

function renderContriesList(countries) {
    console.log(countries.length);
    if(countries.length >=2 && countries.length <= 10)   {
    const countryList = countries.map((country) => 
        `
        <li class="country_element">
        <img class="country_flag" src='${country.flags.svg}' alt='flag' width=35px height=20px/>
        <p class="country_name">${country.name.official}</p>
        </li>
        `
    ).join("");

    refs.listEl.insertAdjacentHTML("beforeend", countryList);
    } else {
    
    if(countries.length > 10) {
        Notify.failure('Too many matches found. Please enter a more specific name.');
    }  else  {
        const countryList = countries.map((country) => 
            `
            <li class="country_element">
            <img class="country_flag" src='${country.flags.svg}' alt='flag' width=40px height=25px/>
            <p class="country_name_one">${country.name.official}</p>
            </li>
            <p class="capital">capital: ${country.capital[0]}</p>
            <p class="population">population: ${country.population}</p>
            <p class="languages">languages: ${Object.values(country.languages)}</p>
            
            `
        ).join("");
    
        refs.infoEl.insertAdjacentHTML("beforeend", countryList);
        };
}
}


