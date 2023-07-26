
let countryContainerEl = document.querySelector(".countryCountainer");
const searchBtnEl = document.querySelector(".searchBtn")
const modeBtnEl = document.querySelector(".mode")
const backButtonEl=document.querySelector(".backBtn")
const homePageEl = document.querySelector(".homepage");
const countryDetailsEl=document.querySelector(".countryDetails")
const apiForAllRegion = "https://restcountries.com/v3.1/all";
const apiByName="https://restcountries.com/v3.1/name/{name}"


async function getCountries(homepage,countryDe) {
    try {
        let returnedPromise = await fetch(`${apiForAllRegion}`)
        let response = await returnedPromise.json();

        let responseWithCapitalcity = response.filter(element => {
            return element.capital;
        })
        
        displayCountries(responseWithCapitalcity)
        countrySearch(searchBtnEl,responseWithCapitalcity)
        FilterCountry(responseWithCapitalcity)


        let allCountries = document.querySelectorAll(".State");
        allCountries.forEach(country => {
            
            country.addEventListener("click", () => {
                let countryId = country.id
                homepage.style.display = "none";
                countryDe.style.display="flex"

            })
        })
        console.log(allCountries)
        
    } catch (err) {
        console.log(err)
    }
} 
getCountries(homePageEl,countryDetailsEl)

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
        let commonNameEl = element.name.common;

        let stateEl = `
        <div class="State" id=${commonNameEl}>
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

function FilterCountry(response) {
    const filterSection = document.querySelector(".filterSection")
    filterSection.addEventListener("change", () => {
        countryContainerEl.innerHTML = "";
        const filterValue = filterSection.value;
        console.log(filterValue)
        let filteredValue = response.filter(element => {
            return element.region == filterValue;
        })
        renderCountries(filteredValue)
    })
}
// swicting modes
function mode(button) {
    modeBtnEl.addEventListener("click", () => {
        document.body.classList.toggle("lightMode");
        if (document.body.classList.contains("lightMode")) {
            document.querySelector(".modeDis").innerHTML="Light Mode"
        } else {
            document.querySelector(".modeDis").innerHTML="Dark Mode"
        }
    })
}
mode(modeBtnEl)


// displaying a particular countries information
function eachCountryInformation() {
    
}

function back(backBotton,home,country) {
    backBotton.addEventListener("click", () => {
        home.style.display = "block";
        country.style.display="none"
    })
}
back(backButtonEl,homePageEl,countryDetailsEl)