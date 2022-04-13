const region = document.getElementById("region");
const search = document.getElementById("search");
const outputInfo = document.getElementById("outputInfo");

let info = [];

//the way of clarifying the events
window.addEventListener("load", getCountry);
region.addEventListener("change", filterCountriesInformation);
document.addEventListener("keypress", searchCountry);

//getting element from country apis
async function getCountry() {
  const resp = await fetch("https://restcountries.com/v3.1/all");
  const info = await resp.json();

  const displayInformation = (newInfo = info) => {
    info.forEach((countries) => {
      const { flags, name, population, region, capital } = countries;
      const country = {
        flag: `${flags.png}`,
        name: `${name.common}`,
        population: `${population.toLocaleString("en")}`,
        region: `${region}`,
        capital: `${capital}`
      };
      showCountry(country);
    });
  };
  displayInformation();
  updateCountriesInfo();
}

//display by pushing countries data
function showCountry(country) {
  info.push(country);
  updateCountriesInfo();
}

//generating new array to display countries
function updateCountriesInfo(infoUpdate = info) {
  outputInfo.innerHTML = "";
  infoUpdate.forEach((country) => {
    const countrydiv = document.createElement("div");
    countrydiv.className = "container rounded-lg shadow-lg bg-white pb-4";
    countrydiv.innerHTML = `
                    <div class="col-md-2 p-1">
                    <div class="card" style="width: 11rem;">
                    <img class="card-img-top" src="${
                      country.flag
                    }" alt="The country flag is for ${country.name.common}">
                    <div class="card-body">
                      <strong><h5 class="card-title">${
                        country.name
                      }</h5></strong><br>
                      <strong>Population:</strong><p class="card-text">${country.population.toLocaleString(
                        "en"
                      )}</p>
                      <strong>Region:</strong><p class="card-text">${
                        country.region
                      }</p>
                      <strong>Capital:</strong><p class="card-text">${
                        country.capital
                      }</p>
                    </div>
                  </div>
                    </div>
        `;
    outputInfo.append(countrydiv);
  });
}

//SEARCH COUNTRIES BY NAME
function searchCountry(e) {
  if (e.keyCode === 13) {
    searchForCountryInformation();
  }
}

async function filterCountriesInformation() {
  info = [];
  const url = `https://restcountries.com/v3.1/region/${region.value}`;
  const res = await fetch(url);
  let data = await res.json();

  const displayInformation = () => {
    data.forEach((countries) => {
      const { flags, name, population, region, capital } = countries;
      const country = {
        flag: `${flags.png}`,
        name: `${name.common}`,
        population: `${population.toLocaleString("en")}`,
        region: `${region}`,
        capital: `${capital}`
      };
      showCountry(country);
    });
  };
  displayInformation();
  updateCountriesInfo(info);
}

async function searchForCountryInformation() {
  info = [];
  const urls = `https://restcountries.com/v3.1/name/${search.value}`;
  const res = await fetch(urls);
  let data = await res.json();

  const displayInformation = () => {
    data.forEach((countries) => {
      const { flags, name, population, region, capital } = countries;
      const country = {
        flag: `${flags.png}`,
        name: `${name.common}`,
        population: `${population.toLocaleString("en")}`,
        region: `${region}`,
        capital: `${capital}`
      };
      showCountry(country);
    });
  };
  displayInformation();
  updateCountriesInfo(info);
}
