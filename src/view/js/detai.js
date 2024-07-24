let nameUser = document.getElementById("name");
let email = document.getElementById("email");
let birthday = document.getElementById("birthday");
let about = document.getElementById("about");
let address = document.getElementById("address");
let idUser;
let alet = document.getElementById("alert");

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("value");

  idUser = value;
  const data = await getUser(value);

  const dateObject = new Date(data.acc.birthday);
  const dateb = dateObject.toISOString().split("T")[0];

  email.value = data.acc.email;
  nameUser.value = data.acc.name;
  address.value = data.acc.address;
  birthday.value = dateb;
  about.value = data.acc.about;
  const selectedGender = document.querySelector(
    `input[name="gender"][value="${data.acc.gender}"]`
  );
  if (selectedGender) {
    selectedGender.checked = true;
  }
});

document
  .getElementById("myForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;

    const info = {
      _id: idUser,
      name: nameUser.value,
      email: email.value,
      birthday: birthday.value,
      about: about.value,
      address: address.value,
      gender: selectedGender,
      about: about.value,
    };

    const a = await EditUser(info);
    console.log(a);
    alet.style.maxHeight = "80px";
    success.innerHTML = a;
  });
