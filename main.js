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

    // Display result
    document.getElementById('result').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
    document.getElementById('result').style.display = 'block';
});
