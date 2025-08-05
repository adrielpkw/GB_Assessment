# User Story 2: Sortable Data Grid

### Brief Project Description

[cite_start]This project is a single web page that displays a sortable data grid of currency and amount records.  
[cite_start]It is built using only vanilla JavaScript, HTML, and CSS, in accordance with the project requirements. 

The key features are:
* [cite_start]A data grid with "Currency" and "Amount" columns.
* [cite_start]The ability to sort each column in both ascending and descending order.
* [cite_start]A custom parsing logic in JavaScript to handle and correctly sort amounts that are formatted differently depending on locality (e.g., using both `.` and `,` as decimal or thousands separators).
* [cite_start]Currency is sorted alphabetically ('string'), while Amount is sorted numerically ('number').

### How to Run

Simply open the `User Story 2/index.html` file in any modern web browser. No server or build process is required.

### Code Quality

[cite_start]The code is written to be readable and functional as per the submission guidelines.
* JavaScript is organized within a `DOMContentLoaded` event listener to ensure the DOM is ready before manipulation.
* Functions are separated for parsing data, rendering the grid, and sorting, improving modularity.
* The use of `data-*` attributes in HTML allows for a clean separation of concerns between the markup and the script.