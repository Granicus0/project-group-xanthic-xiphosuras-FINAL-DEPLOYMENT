const btnTrain = document.querySelector("#btn-train");
const btnProgress = document.querySelector("#btn-progress");
const btnResult = document.querySelector("#btn-result");

const txtEpoch = document.querySelector("#inp-epoch");


const debugArea = document.querySelector("#debug");


btnTrain.addEventListener("click", () => {
  const body = {epoch: parseInt(txtEpoch.value)};
  axios.post("/train", body)
    .then((response) => (debugArea.innerHTML = JSON.stringify(response.data) ));
});


btnProgress.addEventListener("click", () => {
  axios.get("/progress")
    .then((response) => {debugArea.innerHTML = JSON.stringify(response.data)  });
});

btnResult.addEventListener("click", () => {
  axios.get("/result")
    .then((response) => {debugArea.innerHTML = JSON.stringify(response.data)  });
});