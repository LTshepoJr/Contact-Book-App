const rootPath = "https://mysite.itvarsity.org/api/ContactBook/";
const submit = document.getElementById("submitApiKey");
submit.addEventListener("click", setApiKey);

function setApiKey(e) {
  e.preventDefault();

  const apiKey = document.getElementById("apiKey").value;
  fetch(rootPath + "controller/api-key/?apiKey=" + apiKey)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (data == "1") {
        localStorage.setItem("apiKey", apiKey);
        window.open("index.html", "_self");
      } else {
        alert(`${data} Invalid API key entered!`);
      }
    });
}
