// register.js

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Validate inputs
        if (name === "") {
            displayMessage("Name is required.", "error");
            return;
        }

        if (!validateEmail(email)) {
            displayMessage("Invalid email address. Please enter a valid email.", "error");
            return;
        }

        if (password.length < 6) {
            displayMessage("Password must be at least 6 characters long.", "error");
            return;
        }

        if (password !== confirmPassword) {
            displayMessage("Passwords do not match. Please try again.", "error");
            return;
        }

        // Simulated registration success
        displayMessage("Registration successful! Welcome to FinTech.", "success");

        // TODO: Add real registration logic here (e.g., API call)
        console.log({ name, email, password });
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayMessage(message, type) {
        alert(`${type === "error" ? "Error: " : ""}${message}`);
    }
});
