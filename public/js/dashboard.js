
// Handle transaction form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      const type = document.getElementById('type').value;
  
      try {
        const response = await fetch('/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, amount, type }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Transaction added:', result);
  
          // Optionally update the balance and transaction list dynamically
          updateDashboard(result);
        } else {
          console.error('Failed to add transaction:', await response.text());
          alert('Failed to add transaction. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting transaction:', error);
        alert('An error occurred. Please try again.');
      }
    });
  
    // Function to update the dashboard dynamically
    const updateDashboard = (transaction) => {
      // Update the balance, income, or expenses dynamically
      const balanceElement = document.getElementById('balance');
      const incomeElement = document.getElementById('income');
      const expensesElement = document.getElementById('expenses');
      const transactionList = document.getElementById('transaction-list');
  
      // Parse current values
      let balance = parseFloat(balanceElement.innerText);
      let income = parseFloat(incomeElement.innerText);
      let expenses = parseFloat(expensesElement.innerText);
  
      // Update balance, income, or expenses
      if (transaction.type === 'income') {
        balance += parseFloat(transaction.amount);
        income += parseFloat(transaction.amount);
      } else {
        balance -= parseFloat(transaction.amount);
        expenses += parseFloat(transaction.amount);
      }
  
      // Update the DOM
      balanceElement.innerText = balance.toFixed(2);
      incomeElement.innerText = income.toFixed(2);
      expensesElement.innerText = expenses.toFixed(2);
  
      // Add the new transaction to the list
      const transactionElement = document.createElement('div');
      transactionElement.classList.add('transaction');
      transactionElement.innerHTML = `
        <p>Description: ${transaction.description}</p>
        <p>Amount: $${transaction.amount}</p>
        <p>Type: ${transaction.type}</p>
      `;
      transactionList.prepend(transactionElement); // Add to the top of the list
    };
  });