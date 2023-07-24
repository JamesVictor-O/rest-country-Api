
let countryContainerEl = document.querySelector(".countryCountainer");
const searchBtnEl = document.querySelector(".searchBtn")

let apiForAllRegion = "https://restcountries.com/v3.1/all";


async function getCountries() {
    try {
        let returnedPromise = await fetch(`${apiForAllRegion}`)
        let response = await returnedPromise.json();

        let responseWithCapitalcity = response.filter(element => {
            return element.capital;
        })
      
        let nigeria = responseWithCapitalcity.filter(element => {
            return element.name.common.toLowerCase().includes("Nigeria".toLowerCase())
            // console.log(element.name.common)
        })
       console.log(nigeria)
       displayCountries(responseWithCapitalcity,countryContainerEl)
        
    } catch (err) {
        console.log(err)
    }
} 
getCountries()

// displaying country
function displayCountries(response,country) {
    response.forEach(element => {
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
      country.innerHTML += stateEl
   })
    
}

function countrySearch(button) {
    const inputSearchEl = document.querySelector(".inputSearch");
    let searchInput;
    button.addEventListener("click", () => {
        searchInput = inputSearchEl.value;
    })
    return searchBtnEl;
}
countrySearch(searchBtnEl)

let myName = [
    {
        name: "james victor",
        age: 19
    },
    {
        name: "ochula",
        age: 19
    },
    {
        name: "victor",
        age: 19
    },
    {
        name: "dahiru",
        age: 19
    },
    {
        name: "fediral republic of nigeria",
        age: 19
    }
];

let newArr = myName.filter(element => {
    return element.name.includes("nig")
})
console.log(newArr)