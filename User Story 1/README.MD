# User Story 1: Calculator

### Brief Project Description 

This project implements a client-server application for performing mathematical calculations based on expressions being input.

***Server**: A backend service built with Node.js using only core modules. It exposes a single HTTPS REST API endpoint (`/calculate`) to evaluate mathematical string expressions. The server handles operator precedence (`*`, `/` have higher precedence over `+`, `-`)  and implements API key validation for security.

***Client**: A web interface built with HTML, CSS, and vanilla JavaScript.  It provides a text box for users to input an expression and a button to send it to the server. The result or any errors are then displayed on the page. 

### How to Run

**1. Generate SSL Certificates**

The server requires SSL certificates to run over HTTPS. If you have OpenSSL installed, navigate to the `User Story 1/server` directory and run the following command:

openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes -subj "/C=XX/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

**2. Run start-server.sh**

Open terminal, cd to GB_Assessment\User Story 1\server and type the command: .\start-server.sh and click on the link that was printed in the terminal.


**Test Cases**
### Positive
Test ID                 Description                 Input Expression                        Expected Result
P-01                    Simple Addition               5 + 10                                      15
P-02                    Simple Subtraction            20 - 7                                      13
P-03                    Simple Multiplication         4 * 6                                       24
P-04                    Simple Division               18 / 3                                      6
P-05                    Mixed Operators               2 + 3 * 4                                   14
P-06                    Parentheses Precedence        (2 + 3) * 4                                 20
P-07                    Multiple Operations           10 - 2 + 5                                  13
P-08                    Division and Addition         8 / 2 + 5                                   9
P-09                    Complex Expression            5 + 6 * (2 - 1) / 2                         8
P-10                    Zero Result                   5 - 5                                       0

### Negative
Test ID                 Description                  Input Expression         Expected Result
N-01                    Invalid Characters           5 + a                   Error: Invalid characters in expression
N-02                    Division by Zero             10 / 0                  Error: Division by zero! Please check your expression.
N-03                    Empty Expression             (blank)                 Error: Invalid expression format
N-04                    Unmatched Parentheses        (5 + 2                  Error: Mismatched parentheses
N-05                    Multiple Operators Together  5 ++ 2                  Error: Multiple consecutive operators
N-06                    Leading Operator             * 5 + 2                 Error: Leading or trailing operator
N-07                    Trailing Operator            5 + 2 -                 Error: Leading or trailing operator
N-08                    Only Operator                +                       Error: Leading or trailing operator
N-09                    Spaces Only                  (spaces)                Error: Invalid expression format
N-10                    API Key Missing/Invalid      (valid expr, no key)    Error: Unauthorized