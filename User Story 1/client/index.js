document.addEventListener('DOMContentLoaded', () => {
    const inputExpression = document.getElementById('inputExpression');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('result');

    const apiKey = 'GlobalBlue2025'; // Replace with your actual API key
    const apiUrl = `https://localhost:3000/calculate`;
    calculateBtn.addEventListener('click', async () => {
        const expression = inputExpression.value;
        try {
            if (!expression) {
                throw new Error('Expression cannot be empty');
            }
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey // Include the API key in the request headers
                },
                body: JSON.stringify({ expression })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'An error occurred while calculating');
            }
            
            resultDisplay.textContent = data.result;
        } catch (error) {
            resultDisplay.textContent = error;
        }
    });
});