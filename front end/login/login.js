// login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", handleFormSubmission);

    function handleFormSubmission(event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Validate form fields
        if (!validateEmail(email)) {
            displayMessage("Invalid email address. Please check and try again.", "error");
            return;
        }

        if (password.length < 6) {
            displayMessage("Password must be at least 6 characters long.", "error");
            return;
        }

        // Perform a simulated login (or replace with actual API call)
        simulateLogin(email, password);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayMessage(message, type) {
        alert(`${type === "error" ? "Error: " : ""}${message}`);
    }

    function simulateLogin(email, password) {
        console.log("Logging in with:", { email, password });
        displayMessage("Login successful! Welcome to FinTech.", "success");

        // TODO: Replace this simulation with real server communication.
    }
});
