# User Story 1: Calculator

### Brief Project Description 

This project implements a client-server application for performing mathematical calculations based on expressions being input.

***Server**: A backend service built with Node.js using only core modules. It exposes a single HTTPS REST API endpoint (`/calculate`) to evaluate mathematical string expressions. The server handles operator precedence (`*`, `/` have higher precedence over `+`, `-`)  and implements API key validation for security.

***Client**: A web interface built with HTML, CSS, and vanilla JavaScript.  It provides a text box for users to input an expression and a button to send it to the server. The result or any errors are then displayed on the page. 

### How to Run

**1. Generate SSL Certificates**

The server requires SSL certificates to run over HTTPS. If you have OpenSSL installed, navigate to the `User Story 1/server` directory and run the following command:

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes -subj "/C=XX/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

**2. Run start-server.sh**

Open terminal, cd to GB_Assessment\User Story 1\server and type the command: .\start-server.sh and click on the link that was printed in the terminal.