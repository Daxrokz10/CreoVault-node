let loginData = [
  {id:"najeeb",pass:"12345"},
  {id:"daksh",pass:"12345"},
  {id:"yash",pass:"12345"},
  {id:"anash",pass:"12345"},
]
let projects = [];
let trendingProjectsSection = document.querySelector(".trending-projects .row");
let allCardsSection = document.querySelector(".all-cards .row");
let currentSlide = 0;
const cardsPerSlide = 4;
const maxProjects = 8;

async function getProjects() {
  let res = await fetch("./Projects/projects.json");
  let data = await res.json();

  projects = data;


  let trendingProjects = projects.slice(0, 8);

  localStorage.setItem("projects", JSON.stringify(projects));
  window.trendingProjects = trendingProjects; 

  insertTrendingCards();
  insertAllCards();
}

function insertTrendingCards() {
  trendingProjectsSection.innerHTML = "";

  const trendingProjects = window.trendingProjects || [];
  const start = currentSlide * cardsPerSlide;
  const end = start + cardsPerSlide;
  const visibleProjects = trendingProjects.slice(start, end);

  visibleProjects.forEach((project, idx) => {
    let { image, title, creator, codeLink, deployLink } = project;
    let col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    col.innerHTML = `
      <div class="card">
        <div class="card-image mt-3">
          <div class="container">
            <a href="${deployLink}" target="_blank"><img src="${image}" alt=""></a>
          </div>
        </div>
        <div class="card-content ms-3 mt-2">
          <p class="mich">${title}</p>
          <div class="author d-flex align-items-center">
            <a href="">
              <img src="./Homepage/images/user-pf.png" alt="">
            </a>
            <a href="" class="mt-2 ms-2">
              <p class="mich">${creator}</p>
            </a>
          </div>
          <div class="card-actions d-flex justify-content-around mt-3 mb-2">
            <a href="${codeLink}" target="_blank"><button class="ui-verse-btn">Get Code</button></a>
            <a href="${deployLink}" target="_blank"><button class="ui-verse-btn">Live Demo</button></a>
          </div>
        </div>
      </div>
    `;
    trendingProjectsSection.appendChild(col);

    setTimeout(() => {
      col.classList.add("show");
    }, 50 + idx * 60);
  });
  updateSliderButtons();
}

function insertAllCards() {
  allCardsSection.innerHTML = "";
  projects.forEach((project, idx) => {
    let { image, title, creator, codeLink, deployLink } = project;
    let col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    col.innerHTML = `
      <div class="card">
        <div class="card-image mt-3">
          <div class="container">
            <a href="${deployLink}" target="_blank"><img src="${image}" alt=""></a>
          </div>
        </div>
        <div class="card-content ms-3 mt-2">
          <p class="mich">${title}</p>
          <div class="author d-flex align-items-center">
            <a href="">
              <img src="./Homepage/images/user-pf.png" alt="">
            </a>
            <a href="" class="mt-2 ms-2">
              <p class="mich">${creator}</p>
            </a>
          </div>
          <div class="card-actions d-flex justify-content-around mt-3 mb-2">
            <a href="${codeLink}" target="_blank"><button class="ui-verse-btn">Get Code</button></a>
            <a href="${deployLink}" target="_blank"><button class="ui-verse-btn">Live Demo</button></a>
          </div>
        </div>
      </div>
    `;
    allCardsSection.appendChild(col);

    setTimeout(() => {
      col.classList.add("show");
    }, 50 + idx * 30);
  });
}

function updateSliderButtons() {
  const trendingProjects = window.trendingProjects || [];
  document.getElementById("prevBtn").disabled = currentSlide === 0;
  document.getElementById("nextBtn").disabled = (currentSlide + 1) * cardsPerSlide >= trendingProjects.length;
}

function showPrevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    insertTrendingCards();
  }
}

function showNextSlide() {
  const trendingProjects = window.trendingProjects || [];
  if ((currentSlide + 1) * cardsPerSlide < trendingProjects.length) {
    currentSlide++;
    insertTrendingCards();
  }
}

getProjects();

document.getElementById("prevBtn").addEventListener("click", showPrevSlide);
document.getElementById("nextBtn").addEventListener("click", showNextSlide);

document.addEventListener("DOMContentLoaded", () => {
  // Check login status
  const user = localStorage.getItem("user");
  const mainContent = document.getElementById("main-content");
  const loginForm = document.getElementById("login-form");

  if (user) {
    mainContent.style.display = "block";
    loginForm.style.display = "none";
  } else {
    mainContent.style.display = "none";
    loginForm.style.display = "block";
  }

  // Login button
  document.getElementById("login-btn").onclick = function () {
    const username = document.querySelector(".username").value.trim();
    const password = document.querySelector(".password").value.trim();
    const found = loginData.find(
      (u) => u.id === username && u.pass === password
    );
    if (found) {
      localStorage.setItem("user", username);
      mainContent.style.display = "block";
      loginForm.style.display = "none";
    } else {
      alert("Invalid credentials");
    }
  };

  // Guest login
  document.getElementById("guest-btn").onclick = function () {
    localStorage.setItem("user", "guest");
    mainContent.style.display = "block";
    loginForm.style.display = "none";
  };
});
