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
document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission
  
    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Clear the message div before submitting
    document.getElementById('message').textContent = '';
  
    // Create an object to send in the request body
    const data = {
      username,
      email,
      password
    };
  
    try {
      // Send a POST request to the backend to create a new user
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // If the response contains a user, that means sign-up was successful
      if (response.status === 201) {
        document.getElementById('message').textContent = 'Sign-up successful! You can now log in.';
        document.getElementById('message').style.color = 'green';
      } else {
        document.getElementById('message').textContent = result.message || 'An error occurred.';
        document.getElementById('message').style.color = 'red';
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error connecting to the server.';
      document.getElementById('message').style.color = 'red';
    }
  });
  







