const siteName = document.getElementById("bookmarkName");
const siteUrl = document.getElementById("bookmarkUrl");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("tableBody");
const alert = document.querySelector(".box-info");
const closeBtn = document.getElementById("closeBtn");
let sites = [];
let deleteBtn;
let visitBtn;

if (localStorage.getItem("sitesList")) {
  sites = JSON.parse(localStorage.getItem("sitesList"));
  for (let index = 0; index < sites.length; index++) {
    displaySite(index);
  }
}
function displaySite(index) {
  const userUrl = sites[index].siteUrl;
  const httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userUrl)) {
    validUrl = userUrl;
  } else {
    validUrl = `https://${userUrl}`;
  }
  const newSite = `
            <tr>
                <td>${index + 1}</td>
                <td>${sites[index].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${index}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
  `;
  tableBody.innerHTML += newSite;
  deleteBtn = document.querySelectorAll(".btn-delete");
  if (deleteBtn) {
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function (e) {
        deleteSite(e);
      });
    }
  }
  visitBtn = document.querySelectorAll(".btn-visit");
  if (visitBtn) {
    for (let i = 0; i < visitBtn.length; i++) {
      visitBtn[i].addEventListener("click", function (e) {
        visitSite(e);
      });
    }
  }
}
function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}
function capitalize(name) {
  let names = name.split("");
  names[0] = names[0].toUpperCase();
  return names.join("");
}
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    let site = {
      siteName: capitalize(siteName.value),
      siteUrl: siteUrl.value,
    };
    sites.push(site);
    localStorage.setItem("sitesList", JSON.stringify(sites));
    displaySite(sites.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  } else {
    alert.classList.remove("d-none");
  }
});
function deleteSite(e) {
  tableBody.innerHTML = "";
  let deletedIndex = e.target.dataset.index;
  sites.splice(deletedIndex, 1);
  for (let k = 0; k < sites.length; k++) {
    displaySite(k);
  }
  localStorage.setItem("sitesList", JSON.stringify(sites));
}
function visitSite(e) {
  let index = e.target.dataset.index;
  let httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(sites[index].siteUrl)) {
    open(sites[index].siteUrl);
  } else {
    open(`https://${sites[index].siteUrl}`);
  }
}
let nameRegex = /^\w{3,}(\s+\w+)*$/;
let urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}(:\d{1,5})?(\/\S*)?$/;
siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});
siteUrl.addEventListener("input", function () {
  validate(siteUrl, urlRegex);
});
function validate(input, regex) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}
function closeAlert() {
  alert.classList.add("d-none");
}
closeBtn.addEventListener("click", closeAlert);
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeAlert();
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeAlert();
  }
});
