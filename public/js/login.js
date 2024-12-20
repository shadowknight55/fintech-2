// Select the login form and button
const loginForm = document.getElementById("loginForm");
const loginButton = document.querySelector("button[type='submit']"); // Select the login button

// Add an event listener to the login form for the submit event
loginForm.addEventListener("submit", handleFormSubmission);

// Define the function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission

    // Change button text to indicate loading
    loginButton.textContent = "Logging in...";
    loginButton.disabled = true; // Disable the button to prevent multiple clicks

    // Retrieve form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    alert("Form submitted!");
    // Log the values for debugging
    console.log("Login attempt with:", { email, password });

    // Validate form fields
    if (!validateEmail(email)) {
        displayMessage("Invalid email address. Please check and try again.", "error");
        resetButton();
        return;
    }

    if (password.length < 6) {
        displayMessage("Password must be at least 6 characters long.", "error");
        resetButton();
        return;
    }

    // Prepare data to send
    const loginData = { email, password };

    try {
        // Send the login data to the server
        const response = await fetch('/logon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Log the response for debugging
        console.log("Response from server:", response);

        if (response.ok) {
            // If login is successful, redirect to the dashboard
            window.location.href = "/dashboard"; // Adjust the URL as needed
        } else {
            const errorData = await response.json();
            displayMessage(errorData.message || "Login failed. Please try again.", "error");
            resetButton();
        }
    } catch (error) {
        console.error('Error logging in:', error);
        displayMessage("Error connecting to the server.", "error");
        resetButton();
    }
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to display messages to the user
function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.color = type === "error" ? "red" : "green";
}

// Function to reset the button state
function resetButton() {
    loginButton.textContent = "Login"; // Reset button text
    loginButton.disabled = false; // Re-enable the button
}
   
    // function simulateLogin(email, password) {
    //     console.log("Logging in with:", { email, password });
    //     displayMessage("Login successful! Redirecting to your dashboard...", "success");
    
    //     // Simulate successful login and redirect
    //     setTimeout(() => {
    //         window.location.href = "/dashboard"; // Replace with your actual dashboard URL
    //     }, 1000);
    // }
//------------------------------------------------------------------------------------------------------------    
//     const button = document.getElementById('submit-btn');
//     const transactionList = document.getElementById('transaction-list');
//     const logoutButton = document.getElementById('logoutButton');
    
//      button.addEventListener('click',async function (e) {
//         e.preventDefault(); // Prevent the default form submission
        
//         const description = document.getElementById('description').value.trim();
//         const amount = parseFloat(document.getElementById('amount').value);
//         const type = document.getElementById('type').value;
    
//         if (!description || isNaN(amount) || amount <= 0) {
//             alert("Please provide a valid description and amount.");
//             return;
//         }
    
//         // Create the transaction object
//         const transaction = { description, amount, type };
    
    
//         console.log(transaction)
//         // Optionally, simulate a server request with fetch (here, skipping real API calls for simplicity)
//         try {
            
//             //Send code to database
//             const request = await fetch('/transactions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(transaction),
//             })
//             // Simulating an asynchronous server call with `fetch`
//             setTimeout(() => {
//                 // Assume the response is successful
//                 transactions.push(transaction); // Add the transaction to the array
//                 updateUI(); // Update the UI
//                 form.reset(); // Reset the form fields
//             }, 500); // Simulate server delay
//         } catch (error) {
//             console.error('Error submitting transaction:', error);
//         }
//     });
    
//     function updateUI() {
//         transactionList.innerHTML = ''; // Clear the current transaction list
//         let balance = 0,
//             income = 0,
//             expenses = 0;
        

// });
