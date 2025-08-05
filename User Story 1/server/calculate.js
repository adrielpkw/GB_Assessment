function calculate(expression) {
    try {
        // It handles for cases such as below:
        // - '2(3+4)' -> '2*(3+4)'
        // - '(3+4)(5)' -> '(3+4)*(5)'
        const processedExpression = expression
            .replace(/(\d)\(/g, '$1*(')
            .replace(/\)(\d)/g, ')*$1')
            .replace(/\)\(/g, ')*('); // Added to cover cases like '(3)(4)'
        // Splits the expression into numbers and operators.
        const tokens = processedExpression.match(/(\d+\.?\d*|[\+\-\*\/]|\(|\))/g);

        if (!tokens) {
            throw new Error("Invalid characters in expression");
        }
        
        const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
        const values = [];
        const operators = [];

        const applyOperator = () => {
            const operator = operators.pop();
            const right = values.pop();
            const left = values.pop();
            switch (operator) {
                case "+":
                    values.push(left + right);
                    break;
                case "-":
                    values.push(left - right);
                    break;
                case "*":
                    values.push(left * right);
                    break;
                case "/":
                    if (right === 0)
                        throw new Error("Division by zero! Please check your expression.");
                    values.push(left / right);
                    break;
                default:
                    throw new Error(`Unknown operator: ${operator}`);
            }
        };

        for (const token of tokens) {
            if (!isNaN(token)) {
                // If the token is a number, push it onto the values stack
                values.push(parseFloat(token));
            } else if (token === "(") {
                // If the token is '(', push it onto the operators stack
                operators.push(token);
            } else if (token === ")") {
                // If the token is ')', pop from operators until '(' is found
                while (operators.length && operators[operators.length - 1] !== "(") {
                    applyOperator();
                }
                if (operators.length === 0) {
                    throw new Error("Mismatched parentheses");
                }
                operators.pop(); // Pop the '('
            } else if (precedence[token]) {
                // If the token is an operator, apply precedence rules
                // Corrected loop condition: Must not apply operators over a '('
                while (
                    operators.length &&
                    operators[operators.length - 1] !== "(" && 
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    applyOperator();
                }
                operators.push(token);
            } else {
                throw new Error(`Invalid token: ${token}`);
            }
        }

        // Apply remaining operators
        while (operators.length) {
            // Check for mismatched parentheses before applying
            if (operators[operators.length - 1] === "(") {
                throw new Error("Mismatched parentheses");
            }
            applyOperator();
        }

        if (values.length !== 1 || operators.length !== 0) {
            throw new Error("Invalid expression format");
        }

        return values[0];
    } catch (error) {
        throw error;
    }
}

module.exports = { calculate };