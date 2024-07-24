"use strict";
let signupBtn = document.getElementById("signupbtn");
let signinBtn = document.getElementById("signinbtn");
let nameField = document.getElementById("namefield");
let title = document.getElementById("title");
let warn = document.getElementById("warn");
let boxW = document.getElementById("box-req");
let warnUp = document.getElementById("warn-up");

let namev = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

signinBtn.onclick = function (e) {
  e.preventDefault();
  if (signinBtn.classList.value == "disable") {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signinBtn.classList.remove("disable");
    signupBtn.classList.add("disable");
  } else {
    if (email.value != "" && password.value != "") {
      Login(email.value, password.value);
    }
  }
};
signupBtn.onclick = function (e) {
  e.preventDefault();
  if (signinBtn.classList.value != "disable") {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
    boxW.style.maxHeight = "0";
  } else {
    if (namev.value !== "" && email.value != "" && password.value != "") {
      SignUp(email.value, password.value, namev.value);
    }
  }
};

function getText(text) {
  const login = document.getElementById("text-login");
  const sign = document.getElementById("text-sign");
  const remember = document.getElementById("remember");

  if (text == "sign") {
    login.classList.add("hidden");
    sign.classList.remove("hidden");
    remember.classList.add("hidden");
  } else {
    sign.classList.add("hidden");
    remember.classList.remove("hidden");
    login.classList.remove("hidden");
  }
}

function checkVisible() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
