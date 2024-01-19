const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

const generateProduct = function (data) {
  data.forEach((cd) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `<div class="card h-100">
        <img src="${cd.imageUrl}" class="card-img-top" alt="album">
        <div class="card-body">
          <h6 class="card-title">${cd.brand}</h6>
      <h4 class="card-title">${cd.name}</h4>
          <p class="card-text">${cd.description}</p>
          <div>
              <a href="#" class="btn btn-primary">€ ${cd.price}</a>
              <a href="./details.html?cdId=${cd._id}" class="btn btn-success"><i class="bi bi-caret-right"></i></i>
               Scopri di più 
              </a>
          </div>
        </div> 
        
      </div>`;

    const mainRow = document.getElementById("main-row");
    mainRow.appendChild(newCol);
  });
};

const getProduct = function () {
  fetch(myUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2ZhNzE4N2U1YzAwMTgxNGM2MWMiLCJpYXQiOjE3MDU2NTYyMzIsImV4cCI6MTcwNjg2NTgzMn0.yItm54G3cnrY5pCjqjvlCxI-kRt3Xp64hnPN39lDLWA",
    },
  })
    .then((response) => {
      console.log("ciao", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella chiamata");
      }
    })
    .then((data) => {
      console.log("data", data);
      generateProduct(data);
    })

    .catch((err) => {
      console.log(err);
    });
};

getProduct();
