document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get form values
    const price = parseFloat(document.getElementById('price').value);
    const tradeIn = parseFloat(document.getElementById('tradeIn').value);
    const loanBalance = parseFloat(document.getElementById('loanBalance').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const loanDuration = parseInt(document.getElementById('loanDuration').value);
    const salesTax = parseFloat(document.getElementById('salesTax').value) / 100;
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

    // Calculate loan amount
    const totalCost = price - tradeIn - loanBalance - downPayment;
    const totalCostWithTax = totalCost + (totalCost * salesTax);
    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment = (totalCostWithTax * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -loanDuration));

    // Calculate bi-weekly and weekly payments
    const biweeklyPayment = (totalCostWithTax * (interestRate / 26)) / (1 - Math.pow((1 + (interestRate / 26)), -(loanDuration * 2)));
    const weeklyPayment = (totalCostWithTax * (interestRate / 52)) / (1 - Math.pow((1 + (interestRate / 52)), -(loanDuration * 4)));

    // Calculate total interest
    const totalInterestMonthly = (monthlyPayment * loanDuration) - totalCostWithTax;
    const totalInterestBiweekly = (biweeklyPayment * loanDuration * 2) - totalCostWithTax;
    const totalInterestWeekly = (weeklyPayment * loanDuration * 4) - totalCostWithTax;

    // Display results
    document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toFixed(2)}`;
    document.getElementById('biweeklyPayment').textContent = `$${biweeklyPayment.toFixed(2)}`;
    document.getElementById('weeklyPayment').textContent = `$${weeklyPayment.toFixed(2)}`;

    document.getElementById('monthlyInterest').textContent = `$${totalInterestMonthly.toFixed(2)}`;
    document.getElementById('biweeklyInterest').textContent = `$${totalInterestBiweekly.toFixed(2)}`;
    document.getElementById('weeklyInterest').textContent = `$${totalInterestWeekly.toFixed(2)}`;

    document.getElementById('result').style.display = 'block';
    document.getElementById('paymentTable').style.display = 'table'; // Show the table
});
