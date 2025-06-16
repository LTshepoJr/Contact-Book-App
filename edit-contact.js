const homeContact = document.getElementById("home");
const fullUrl = window.location.href;
const id = fullUrl.split("?id=")[1] || "";
const editFirstname = document.getElementById("edit-firstname");
const editLastname = document.getElementById("edit-lastname");
const editMobile = document.getElementById("edit-mobile");
const editEmail = document.getElementById("edit-email");
const avatarImage = document.getElementById("avatar-image");
const editContact = document.getElementById("edit-contact");
const saveContact = document.getElementById("save-contact");
const deleteContact = document.getElementById("delete-contact");

const homeLink = () => {
  window.open("index.html", "_self");
};

homeContact.addEventListener("click", () => {
  homeLink();
});

fetch(`${rootPath}controller/get-contacts/?id=${id}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error! status ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach(({ avatar, firstname, email, lastname, mobile, id }) => {
      editFirstname.value = firstname;
      editLastname.value = lastname;
      editMobile.value = mobile;
      editEmail.value = email;
      const displayImg = `<img
          src="${rootPath}controller/uploads/${avatar}"
          alt="${firstname} ${lastname} ${id}"
        />`;
      avatarImage.insertAdjacentHTML("beforeend", displayImg);
    });
  });

editContact.addEventListener("click", () => {
  editFirstname.readOnly = false;
  editLastname.readOnly = false;
  editMobile.readOnly = false;
  editEmail.readOnly = false;
  document.getElementById("edit-choose-avatar").hidden = false;
  document.getElementById("avatar-label").hidden = false;
  document.getElementById("save-contact").hidden = false;
  editContact.hidden = true;
});

saveContact.addEventListener("click", () => {
  const editForm = document.getElementById("edit-form");
  const newForm = new FormData(editForm);
  newForm.append("apiKey", apiKey);
  newForm.append("id", id);
  fetch(`${rootPath}controller/edit-contact/`, {
    method: "POST",
    body: newForm,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data === "1") {
        alert("Saved!");
        homeLink();
      } else {
        alert(`Error: ${data}`);
      }
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      alert("Failed to save contact. Please try again.");
    });
});

deleteContact.addEventListener("click", () => {
  const confirmDel = confirm("Delete contact?");
  if (confirmDel) {
    fetch(`${rootPath}controller/delete-contact/?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! status ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        if (data === "1") {
          homeLink();
        } else {
          alert(`Error: ${data}`);
        }
      });
  }
});
