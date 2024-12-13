document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transaction-form");  // Ensure this matches your form id in dashboard.ejs
    form.addEventListener("submit", handleFormSubmission);

    async function handleFormSubmission(event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form values
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;

        // Validate form values (optional)
        if (!description || !amount || isNaN(amount) || !type) {
            alert("Please fill out all fields.");
            return;
        }

        // Prepare data to send
        const transactionData = {
            description,
            amount,
            type
        };

        try {
            // Send the transaction data to the backend via a POST request
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (response.ok) {
                const data = await response.json();
                // Optionally update the UI with the new transaction
                addTransactionToUI(data);
                form.reset(); // Clear the form after submission
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Error saving transaction");
            }
        } catch (error) {
            alert("Error connecting to the server.");
        }
    }

    function addTransactionToUI(transaction) {
        const transactionList = document.getElementById("transaction-list");
        const li = document.createElement("li");
        li.classList.add("transaction-item");
        li.classList.add(transaction.type); // Add type class (income/expense)
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>$${transaction.amount.toFixed(2)}</span>
        `;
        transactionList.appendChild(li);
    }
});