const contactBook = document.getElementById("contact-book");
const addContact = document.getElementById("add-contact");

const homeLink = () => {
  window.open("index.html", "_self");
};

contactBook.addEventListener("click", () => {
  homeLink();
});

addContact.addEventListener("click", () => {
  const contactForm = document.getElementById("form-contact");
  const newForm = new FormData(contactForm);
  newForm.append("apiKey", apiKey);
  fetch(`${rootPath}controller/insert-contact/`, {
    method: "POST",
    body: newForm,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data === "1") {
        alert("Contact added!");
        homeLink();
      } else {
        alert(`Error: ${data}`);
      }
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      alert("Failed to add contact. Please try again.");
    });
});
