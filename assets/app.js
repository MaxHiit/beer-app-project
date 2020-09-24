// Variables
const urlBase = "https://api.punkapi.com/v2/beers?page=";
const beers = document.querySelector(".beers");
const filterABV = document.getElementById("filterABV");
const filterIBU = document.getElementById("filterIBU");
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let optionsABV = "";
let optionsIBU = "";
let page = "1";

// filters
// Filter ABV event listener
filterABV.addEventListener("change", (e) => {
  const value = e.target.value;
  switch (value) {
    case "all":
      optionsABV = "";
      break;
    case "weak":
      optionsABV = "&abv_lt=4.6";
      break;
    case "medium":
      optionsABV = "&abv_gt=4.5&avb_lt=7.6";
      break;
    case "strong":
      optionsABV = "&abv_gt=7.5";
      break;
  }
  page = 1;
  getBeers();
});

// Filter IBU event listener
filterIBU.addEventListener("change", (e) => {
  const value = e.target.value;
  switch (value) {
    case "all":
      optionsIBU = "";
      break;
    case "weak":
      optionsIBU = "&ibu_lt=35";
      break;
    case "medium":
      optionsIBU = "&ibu_gt=34&ibu_lt=75";
      break;
    case "strong":
      optionsIBU = "&ibu_gt=74";
      break;
  }
  page = 1;
  getBeers();
});

async function getBeers() {
  const url = urlBase + page + optionsABV + optionsIBU;
  //   try {
  // fetch beer data
  const beerPromise = await fetch(url);
  const beersData = await beerPromise.json();

  //   pagination
  pageText.innerText = page;

  if (page == 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }
  if (beers.length < 25) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  // render beer data
  let html = "";
  const genericBottle = "https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png";

  beersData.forEach((el) => {
    const beerName = el.name;
    const beerAbv = el.abv;
    const beerIbu = el.ibu;
    const beerImgSRc = el.image_url;
    const beerTagLine = el.tagline;
    const beerDes = el.description;
    const beerPairing = el.food_pairing.join(",");

    html += `
      <div class="beer-wrapper card">
         <div class="beer">
            <img class="beer__img" src="${beerImgSRc ? beerImgSRc : genericBottle}">
            <div class="beer__container-info">
               <h3>${beerName}</h3>
               <span class="beer__info">
                  <span>ABV: ${beerAbv}%</span>
                  <span>IBU: ${beerIbu}</span>
               </span>
            </div>
         </div>
         <div class="beer__content">
            <div class="beer__name">${beerName}</div>
            <div class="beer__tagline">${beerTagLine}</div>
            <div class="beer__description">${beerDes}</div>
            <div class="beer__food-pairing">
               <p><strong>Pair with:</strong> ${beerPairing}</p>
            </div>
         </div>   
      </div>
    `;
  });

  beers.innerHTML = html;
  //   } catch (err) {
  //     console.error("Error: " + err);
  //   }
}

// pagination event listener
prevPage.addEventListener("click", () => {
  page--;
  getBeers();
});
nextPage.addEventListener("click", () => {
  page++;
  getBeers();
});

// init get beer
getBeers();
