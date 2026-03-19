document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 1025;

  function createObserver(selector, options, activeClass) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);
        } else {
          entry.target.classList.remove(activeClass);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
  }

  createObserver(
    "#about .phrase",
    { root: null, threshold: isMobile ? 0.5 : 1 },
    "active",
  );
  createObserver(
    "#gallery .image-box",
    { root: null, threshold: isMobile ? 0.5 : 1 },
    "active",
  );
  createObserver(
    "#blog .featured-article, #blog .article",
    { root: null, threshold: isMobile ? 0.01 : 0.3 },
    "fadeInUp",
  );
  createObserver(
    "#contact > div",
    { root: null, threshold: isMobile ? 0.01 : 0.7 },
    "fadeInUp",
  );
});

const nav = document.getElementById("nav");
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelectorAll("nav ul li a");

function toggleMenu() {
  nav.classList.toggle("active");
  menuIcon.classList.toggle("active");
  navLinks.forEach((link) => link.classList.toggle("active"));
}

function hideMenu() {
  nav.classList.remove("active");
  menuIcon.classList.remove("active");
  navLinks.forEach((link) => link.classList.remove("active"));
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = this;
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 10000);
      } else {
        alert("Form submission failed!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
