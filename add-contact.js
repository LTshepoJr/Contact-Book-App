const contactBook = document.getElementById("contact-book");
const addContactSubmit = document.getElementById("add-contact-submit");

contactBook.addEventListener("click", () => {
  window.open("index.html", "_self");
});

addContactSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const contactForm = document.getElementById("form-contact");
  const newForm = new FormData(contactForm);
  newForm.append("apiKey", apiKey);
  for (const [key, value] of newForm.entries()) {
    console.log(`${key}:`, value);
  }
});
