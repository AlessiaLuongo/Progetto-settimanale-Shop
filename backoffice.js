let cdNameInput = document.getElementById("cd-name");
let descriptionInput = document.getElementById("description");
let bandNameInput = document.getElementById("band-name");
let priceInput = document.getElementById("price");
let pictureInput = document.getElementById("picture");

let creationForm = document.getElementById("add-cd-form");

let addButton = document.getElementById("add-button");

const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  document.getElementById("titolo-form").innerText = "Modifica Prodotto";

  fetch(myUrl + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2ZhNzE4N2U1YzAwMTgxNGM2MWMiLCJpYXQiOjE3MDU2NTYyMzIsImV4cCI6MTcwNjg2NTgzMn0.yItm54G3cnrY5pCjqjvlCxI-kRt3Xp64hnPN39lDLWA",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Nessuno prodotto recuperato");
      }
    })
    .then((cd) => {
      cdNameInput.value = cd.name;
      descriptionInput.value = cd.description;
      bandNameInput.value = cd.brand;
      pictureInput.value = cd.imageUrl;
      priceInput.value = cd.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

creationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: cdNameInput.value,
    description: descriptionInput.value,
    brand: bandNameInput.value,
    imageUrl: pictureInput.value,
    price: priceInput.value,
  };
  console.log(newProduct);

  let URLToUse;
  let methodToUse;
  if (productId) {
    methodToUse = "PUT";
    URLToUse = myUrl + "/" + productId;
  } else {
    methodToUse = "POST";
    URLToUse = myUrl;
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2ZhNzE4N2U1YzAwMTgxNGM2MWMiLCJpYXQiOjE3MDU2NTYyMzIsImV4cCI6MTcwNjg2NTgzMn0.yItm54G3cnrY5pCjqjvlCxI-kRt3Xp64hnPN39lDLWA",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        cdNameInput.value = "";
        descriptionInput.value = "";
        bandNameInput.value = "";
        pictureInput.value = "";
        priceInput.value = "";
      }
    })
    .then(alert("Salvato con successo"), window.location.replace("./home.html"))
    .catch((err) => {
      console.log(err);
    });
});

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  toggleDiv();
});

const toggleDiv = function () {
  document.getElementById("ultimatum").classList.toggle("d-none");
};
const reset = function () {
  cdNameInput.value = "";
  descriptionInput.value = "";
  bandNameInput.value = "";
  pictureInput.value = "";
  priceInput.value = "";
};

let yesButton = document.getElementById("yes-button");
let noButton = document.getElementById("no-button");

yesButton.addEventListener("click", function () {
  reset();
  toggleDiv();
});

noButton.addEventListener("click", function () {
  toggleDiv();
});
