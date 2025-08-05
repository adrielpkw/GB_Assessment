document.addEventListener('DOMContentLoaded', function() {
    const initialData = [
        {currency: 'AUD', amount: '1100.00'},
        {currency: 'GBP', amount: '899.00'},
        {currency: 'MYR', amount: '56000.00'},
        {currency: 'EUR', amount: '5388.00'}
    ];

    const parseAmount = (amount) => {
        return parseFloat(amount);
    };

    let tableData = initialData.map(item => ({
        ...item,
        amount: parseAmount(item.amount)
    }));

    const gridBody = document.querySelector('#dataBody');
    const headers = document.querySelectorAll('#dataGrid th');

    const renderGrid = (data) => {
        gridBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.currency}</td><td>${item.amount.toFixed(2)}</td>`;
            gridBody.appendChild(row);
        });
    };

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            const direction_current = header.dataset.sortDir;
            const direction_new = direction_current === 'asc' ? 'desc' : 'asc';
            
            headers.forEach(h => h.querySelector('span').textContent = '');
            sortData(column, direction_new);
            header.dataset.sortDir = direction_new;
            header.querySelector('span').textContent = direction_new === 'desc' ? '▼':'▲' ;
            renderGrid(tableData);
        })
    })

    const sortData = (column, direction) => {
        tableData.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            
            console.log(`Sorting by '${column}': Comparing ${valA} and ${valB}`);
            
            let comparison = 0;
            if (column === 'amount') {
                comparison = valA - valB;
            } else {
                comparison = String(valA).localeCompare(String(valB));
            }

            return direction === 'asc' ? comparison : -comparison;
        });
    };

    renderGrid(tableData);
});