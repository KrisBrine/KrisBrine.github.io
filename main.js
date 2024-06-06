document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leaseForm');
    const result = document.getElementById('result');
    const inputs = form.querySelectorAll('input[type="text"]');

    inputs.forEach(input => {
        input.addEventListener('input', function(event) {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const capitalizedCost = parseFloat(document.getElementById('capitalizedCost').value);
        const residualValue = parseFloat(document.getElementById('residualValue').value);
        const apr = parseFloat(document.getElementById('apr').value);
        const term = parseInt(document.getElementById('term').value);
        const salesTaxRate = parseFloat(document.getElementById('salesTaxRate').value);
        const downPayment = parseFloat(document.getElementById('downPayment').value);
        const fees = parseFloat(document.getElementById('fees').value);

        if (isNaN(capitalizedCost) || isNaN(residualValue) || isNaN(apr) || isNaN(term) || isNaN(salesTaxRate) || isNaN(downPayment) || isNaN(fees)) {
            result.textContent = 'Please enter valid numbers in all fields.';
            return;
        }

        const monthlyPayment = calculateLeasePayment(capitalizedCost, residualValue, apr, term, salesTaxRate, downPayment, fees);

        result.textContent = `Monthly Lease Payment: $${monthlyPayment.toFixed(2)}`;
    });

    form.addEventListener('reset', function() {
        result.textContent = '';
    });
});

function calculateLeasePayment(capitalizedCost, residualValue, apr, term, salesTaxRate, downPayment, fees) {
    const aprDecimal = apr / 100.0;
    const adjustedCapCost = capitalizedCost - downPayment + fees;
    const depreciationFee = (adjustedCapCost - residualValue) / term;
    const financeFee = (adjustedCapCost + residualValue) * aprDecimal / 24;
    const baseMonthlyPayment = depreciationFee + financeFee;
    const totalMonthlyPayment = baseMonthlyPayment * (1 + salesTaxRate / 100.0);
    return totalMonthlyPayment;
}
