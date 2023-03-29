let form = document.querySelector(".form");
let inpName = document.querySelector(".inpName");
let inpEmail = document.querySelector(".inpEmail");
let inpNumber = document.querySelector(".inpNumber");
let intUrl = document.querySelector(".intUrl");
let btnSave = document.querySelector(".btnSave");
let btnCancel = document.querySelector(".btnCancel");
let contactList = document.querySelector(".contact-list");

// Создаем массив для хранения контактов
let contacts = [];

//! Функция для отображения контактов на странице
function showContacts() {
  // Очищаем список контактов перед отображением
  contactList.innerHTML = "";
  // Проходим по всем контактам в массиве и добавляем их на страницу
  contacts.forEach((contact, index) => {
    contactList.innerHTML += `
      <li>
      <img src="${contact.imageUrl}" alt="${contact.name}">
        <h3>${contact.name}</h3>
        <p>${contact.phone}</p>
        <button class="btnEdit" data-index="${index}">Edit</button>
        <button class="btnDelete" data-index="${index}">Delete</button>
      </li>
    `;
  });
}

// Функция для добавления контакта в массив и на страницу
function addContact(name, imageUrl, phone) {
  // Создаем новый объект контакта с ключами и добавляем его в массив
  let contact = { name, imageUrl, phone };
  contacts.push(contact);
  // Обновляем список контактов на странице
  showContacts();
  // Сохраняем массив контактов в localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Получаем значения полей формы и добавляем контакт
  let name = inpName.value.trim();
  let imageUrl = intUrl.value.trim();
  let phone = inpNumber.value.trim();
  if (name && imageUrl && phone) {
    addContact(name, imageUrl, phone);
    // Очищаем поля формы
    inpName.value = "";
    intUrl.value = "";
    inpNumber.value = "";
  } else {
    alert("Заполните поле!");
    return;
  }
});

//! добавляем событие на кнопку delete
contactList.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnDelete")) {
    let index = event.target.dataset.index;
    deleteContact(index);
  }
});

function deleteContact(index) {
  contacts.splice(index, 1);
  showContacts();
  let data = localStorage.setItem("contacts", JSON.stringify(contacts));
}
// !================================================

//!  Edit-изменение
// стягиваем из html документа следующие элементы
let modal = document.querySelector(".modal");
let inpEdit1 = document.querySelector(".modal_body .inp1");
let inpEdit2 = document.querySelector(".modal_body .inp2");
let inpEdit3 = document.querySelector(".modal_body .inp3");
let btnSaveModal = document.querySelector(".modal_body button");
let closeModal = document.querySelector(".modal_footer button");

// Функция для редактирования контакта в массиве и на странице
function editContact(index) {
  modal.style.display = "block";
  inpEdit1.value = contacts[index].name;
  inpEdit2.value = contacts[index].imageUrl;
  inpEdit3.value = contacts[index].phone;
  modal.dataset.index = index;
}
//!  Edit-кнопка
contactList.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnEdit")) {
    let index = event.target.dataset.index;
    editContact(index);
  }
});

// Проверяем, есть ли контакты в localStorage
if (localStorage.getItem("contacts")) {
  // Если есть, то загружаем их в массив
  contacts = JSON.parse(localStorage.getItem("contacts"));
  // И отображаем на странице
  showContacts();
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

btnSaveModal.addEventListener("click", () => {
  // берем индекс контактов котрые мы будем редактировать
  let index = modal.dataset.index;
  // получаем значения из заполенных инпутов в модальном окне
  let newName = inpEdit1.value.trim();
  let newImageUrl = inpEdit2.value.trim();
  let newPhone = inpEdit3.value.trim();

  // обновляем данные в инпуте после редактирования
  contacts[index].name = newName;
  contacts[index].imageUrl = newImageUrl;
  contacts[index].phone = newPhone;

  // Save the updated contacts array to localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Close the edit modal
  modal.style.display = "none";
  // обновляем
  showContacts();
});
