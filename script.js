window.addEventListener("load", () => {
  //   console.log(rootPath);
  //   console.log(apiKey);
  fetch(rootPath + "controller/get-contacts/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   displayOutput(data);
      console.log(data);
    });
});
