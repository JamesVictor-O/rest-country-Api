
let countryContainerEl = document.querySelector(".countryCountainer");
const searchBtnEl = document.querySelector(".searchBtn")
const modeBtnEl=document.querySelector(".mode")
let apiForAllRegion = "https://restcountries.com/v3.1/all";


async function getCountries() {
    try {
        let returnedPromise = await fetch(`${apiForAllRegion}`)
        let response = await returnedPromise.json();

        let responseWithCapitalcity = response.filter(element => {
            return element.capital;
        })
        
        displayCountries(responseWithCapitalcity)
        countrySearch(searchBtnEl,responseWithCapitalcity)
       
        // let allCountries = document.querySelectorAll(".State");
        // allCountries.addEventListener("click", () => {
        //     alert("lets go")
        // })
        
    } catch (err) {
        console.log(err)
    }
} 
getCountries()

// displaying country
function displayCountries(response) {
    renderCountries(response)
}

function countrySearch(button,response) {
    const inputSearchEl = document.querySelector(".inputSearch");
    button.addEventListener("click", () => {
        countryContainerEl.innerHTML = "";
        let searchInput = inputSearchEl.value;

        let searchedValue = response.filter(element => {
            return element.name.official.toLowerCase().includes(searchInput.toLowerCase())
        })
        renderCountries(searchedValue)
        console.log(searchedValue)
    })
    
}

function renderCountries(countryArrays) {
    countryArrays.forEach(element => {
        let imageEl = element.flags.png;
        let capitalEl = element.capital[0];
        let regionEl = element.region;
        let population = element.population;
        let officialNameEl = element.name.official;

        let stateEl = `
        <div class="State">
        <img src=${imageEl} alt="">
        <div class="stateDetails">
            <h3>${officialNameEl}</h3>
            <div>
                <div>
                    <label for="name">Population:</label>
                    <span>${population}</span>
                </div>
                <div>
                    <label for="name">Region:</label>
                    <span>${regionEl}</span>
                </div>
                <div>
                    <label for="name">Capital:</label>
                    <span>${capitalEl}</span>
                </div>
            </div>
        </div>
       </div>
        `
      countryContainerEl.innerHTML += stateEl
   })
}

// swicting modes
function mode(button) {
    modeBtnEl.addEventListener("click", () => {
        document.body.classList.toggle("lightMode")
    })
}
mode(modeBtnEl)
