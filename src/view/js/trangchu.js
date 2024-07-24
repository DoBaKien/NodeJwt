const textlog = document.getElementById("log");
const btnChange = document.getElementById("changeP");
const textDanger = document.getElementById("danger");
var myModal = new bootstrap.Modal(document.getElementById("myModal"));
const alet = document.getElementById("alert");
const success = document.getElementById("success");
const OutBtn = document.getElementById("logout");

document
  .getElementById("changeForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const oldPassword = document.getElementById("password").value;
    const newPassword = document.getElementById("password1").value;
    console.log(JSON.stringify({ oldPassword, newPassword }));
    myModal.show();
    btnChange.onclick = async function () {
      if (oldPassword != "" && newPassword != "") {
        const a = await changePass(oldPassword, newPassword);
        textDanger.innerHTML = a;
        alet.style.maxHeight = "80px";
      } else {
        textDanger.innerHTML = "Password not null";
        alet.style.maxHeight = "80px";
      }
    };
  });

function checkVisible() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function checkVisible1() {
  var x = document.getElementById("password1");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

OutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (token == undefined) {
    window.location.href = "index.html";
  } else {
    delete_cookie();
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("tbody");

  if (token != undefined) {
    const userLog = await getLog();
    textlog.value = `Xin Chào ${userLog.userD.name}`;
  } else {
    OutBtn.textContent = "Login";
    textlog.value = `Chưa đăng nhập`;
  }

  const data = await getAllUser();

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    const columns = ["_id", "name", "email", "createdAt"];

    columns.values(item).forEach((column, i) => {
      const cell = document.createElement("td");
      if (column === "createdAt") {
        cell.textContent = formatDate(item[column]);
      } else if (column === "_id") {
        cell.textContent = index + 1;
      } else {
        cell.textContent = item[column];
      }
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");

    // Tạo nút "Edit"
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      window.location.href = `./detail.html?value=${item._id}`;
    });

    // Tạo nút "Delete"
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      console.log("Xóa " + item._id);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
});
