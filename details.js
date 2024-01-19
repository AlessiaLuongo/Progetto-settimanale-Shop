const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("cdId");
console.log(productId);

const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

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
      throw new Error("Errore nella chiamata");
    }
  })
  .then((cd) => {
    console.log(cd);
    document.getElementById("picture").src = cd.imageUrl;
    document.getElementById("name").innerText = cd.name;
    document.getElementById("band-name").innerText = cd.brand;
    document.getElementById("description").innerText = cd.description;
    document.getElementById("price").innerText = cd.price;

    document.getElementById("delete").addEventListener("click", function () {
      toggleDiv();
    });
    document
      .getElementById("edit")
      .setAttribute("href", "./backoffice.html?productId=" + cd._id);
  })
  .catch((err) => {
    console.log(err);
  });

const toggleDiv = function () {
  document.getElementById("ultimatum").classList.toggle("d-none");
};

const deleteAlbum = function () {
  console.log("ciao");
  fetch(myUrl + "/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2ZhNzE4N2U1YzAwMTgxNGM2MWMiLCJpYXQiOjE3MDU2NTYyMzIsImV4cCI6MTcwNjg2NTgzMn0.yItm54G3cnrY5pCjqjvlCxI-kRt3Xp64hnPN39lDLWA",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Cancellato con successo ");
        location.assign("./home.html");
      } else {
        alert("Problema nella cancellazione");
        throw new Error("errore nella cancellazione");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let yesButton = document.getElementById("yes-button");
let noButton = document.getElementById("no-button");

yesButton.addEventListener("click", function () {
  deleteAlbum();
});

noButton.addEventListener("click", function () {
  toggleDiv();
});
