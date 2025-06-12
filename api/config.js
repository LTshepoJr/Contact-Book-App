const rootPath = "https://mysite.itvarsity.org/api/ContactBook/";

const checkApiKey = () => {
  if (!localStorage.getItem("apiKey")) {
    window.open("enter-api-key.html", "_self");
  }
  return localStorage.getItem("apiKey");
};

let apiKey = checkApiKey();
