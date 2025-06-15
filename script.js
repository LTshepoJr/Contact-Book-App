const refresh = document.getElementById("refresh");
const addContact = document.getElementById("add-contact");
const logOut = document.getElementById("log-out");
const contactWrapper = document.getElementById("contact-wrapper");

window.addEventListener("load", () => {
  fetch(`${rootPath}controller/get-contacts/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach(({ avatar, firstname, email, lastname, mobile, id }) => {
        const contact = `<div
          id="contact"
          class="edit-contact"
          data-id="${id}"
        >
          <img
            src="${rootPath}controller/uploads/${avatar}"
            alt="${firstname} ${lastname} ${id}"
          />
          <div>
            <h2>${firstname} ${lastname}</h2>
            <p>${email}</p>
            <p>${mobile}</p>
          </div>
        </div>`;
        contactWrapper.insertAdjacentHTML("beforeend", contact);
      });
      document.querySelectorAll(".edit-contact").forEach((contact) => {
        contact.addEventListener("click", () => {
          const contactId = contact.dataset.id;
          window.open(`edit-contact.html?id=${contactId}`, "_self");
        });
      });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});

refresh.addEventListener("click", () => {
  location.reload();
});

addContact.addEventListener("click", () => {
  window.open("add-contact.html", "_self");
});

logOut.addEventListener("click", () => {
  localStorage.removeItem("apiKey");
  location.reload();
});
