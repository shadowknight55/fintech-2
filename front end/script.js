// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Highlight active navigation link
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute("href") === `.${currentPath}`) {
            link.classList.add("active");
        }
    });

    // Event listeners for buttons on the main page
    const registerButton = document.querySelector("a[href='./register/register.html'] button");
    const loginButton = document.querySelector("a[href='./login/login.html'] button");

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            console.log("Register button clicked");
        });
    }

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            console.log("Login button clicked");
        });
    }
});
