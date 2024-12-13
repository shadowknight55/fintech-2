document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form values
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

        try {
            const data = { username: name, email, password };
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                redirect: 'follow', // Allow redirects to be followed
            });

            if (response.ok) {
                displayMessage('Sign-up successful! Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = "/dashboard"; // Redirect to the dashboard
                }, 1000);
            } else {
                const result = await response.json();
                displayMessage(result.message || 'An error occurred.', 'error');
            }
        } catch (error) {
            displayMessage('Error connecting to the server.', 'error');
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayMessage(message, type) {
        alert(`${type === "error" ? "Error: " : ""}${message}`);
    }
});

