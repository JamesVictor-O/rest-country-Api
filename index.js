
let countryContainerEl = document.querySelector(".countryCountainer");
const searchBtnEl = document.querySelector(".searchBtn")
const modeBtnEl = document.querySelector(".mode")
const backButtonEl=document.querySelector(".backBtn")
const homePageEl = document.querySelector(".homepage");
const countryDetailsEl=document.querySelector(".countryDetails")
const apiForAllRegion = "https://restcountries.com/v3.1/all";
const apiByName="https://restcountries.com/v3.1/name/{name}"
const aboutCountryEl = document.querySelector(".about");

async function getCountries(homepage,countryDe) {
    try {
        let returnedPromise = await fetch(`${apiForAllRegion}`)
        let response = await returnedPromise.json();
        
        let responseWithCapitalcity = response.filter(element => element.capital)
        
        displayCountries(responseWithCapitalcity)
        countrySearch(searchBtnEl,responseWithCapitalcity)
        FilterCountry(responseWithCapitalcity)


        let allCountries = document.querySelectorAll(".State");
        allCountries.forEach(country => {
            country.addEventListener("click", () => {
                aboutCountryEl.innerHTML = "";
                let countryId = country.id
                homepage.style.display = "none";
                countryDe.style.display = "block"
                async function countryByName() {
                    try {
                        let countryByName = await fetch(`https://restcountries.com/v3.1/name/${countryId}`)
                        let response = await countryByName.json()
                        console.log(response)
                        renderCountriesDetails(response)
                    } catch (err) {
                        console.log(err)
                    }
                }
                countryByName()
                
            })
        })
        
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


function renderCountriesDetails(countryArrays) {
    countryArrays.forEach(element => {
        let imageEl = element.flags.png;
        let capitalEl = element.capital[0];
        let regionEl = element.region;
        let population = element.population;
        let subRegionEl = element.subregion;
        let topEl=element.tld[0]
        let commonNameEl = element.name.common;
        let nativeNameEl = element.name.nativeName;
        let currency = element.currencies;
        let currencyName=Object.values(currency)[0].name
        let realNative=Object.values(nativeNameEl)[0].official



        console.log(currencyName)
        let stateEl = `
        <div class="imgContainer">
        <img src=${imageEl} alt="">
      </div>

       <div class="country">
        <div class="countryName">
            <h2>${commonNameEl}</h2>
         </div>
        <div class="discription">
            <div class="firstRow">
               <div class="countryInformation">
                    <div>
                        <label for="name">Native Name:</label>
                        <span>${realNative}</span>
                    </div>
    
                    <div>
                        <label for="population">Population:</label>
                        <span>${population}</span>
                    </div>
                    <div>
                        <label for="region">Region:</label>
                        <span>${regionEl}</span>
                    </div>
                    <div>
                        <label for="sub-region">Sub Region:</label>
                        <span>${subRegionEl}</span>
                    </div>
                    <div>
                        <label for="capital">Capital:</label>
                        <span>${capitalEl}</span>
                    </div>
               </div>
            </div>

            <div class="secondRow">
                <div>
                    <label for="Top level domine">Top Level Domain:</label>
                    <span>${topEl}</span>
                </div>
                <div>
                    <label for="Currencies">Currencies:</label>
                    <span>${cu}</span>
                </div>
                <div>
                    <label for="Languages">Languages:</label>
                    <span>Dutch,French,German</span>
                </div>
                
            </div>
         </div>
         <div class="countryBorders">
            <h2>Border Countries:</h2>
            <div class="borders">
                <input type="button" value="Germany">
                <input type="button" value="France">
                <input type="button" value="Netherlands">
            </div>
         </div>
       </div>
        `
        aboutCountryEl.innerHTML = stateEl;
    })

}

function FilterCountry(response) {
    const filterSection = document.querySelector(".filterSection")
    filterSection.addEventListener("change", () => {
        countryContainerEl.innerHTML = "";
        const filterValue = filterSection.value;
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