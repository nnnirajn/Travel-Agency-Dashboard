document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    let currentFilter = 'all';
    let searchQuery = '';

    function render() {
        const tbody = document.getElementById('bookingsTable');
        let list = bookings.filter(b => currentFilter === 'all' || b.status === currentFilter);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(b =>
                b.client.toLowerCase().includes(q) ||
                b.destination.toLowerCase().includes(q) ||
                b.id.toLowerCase().includes(q)
            );
        }

        tbody.innerHTML = list.map(b => `
            <tr>
                <td class="id-cell" data-label="ID">${b.id}</td>
                <td data-label="Client"><div class="client-cell"><img class="client-avatar" src="${b.avatar}" alt="${b.client}"><div><div class="client-name">${b.client}</div><div class="client-email">${b.email}</div></div></div></td>
                <td data-label="Destination"><div class="destination-cell"><span class="destination-flag">${b.flag}</span>${b.destination}</div></td>
                <td data-label="Date">${b.date}</td>
                <td class="amount-cell" data-label="Amount">${b.amount}</td>
                <td data-label="Status"><span class="status-badge status-${b.status}">${b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
            </tr>
        `).join('') || '<tr><td colspan="6" class="empty-cell">No bookings found.</td></tr>';

        document.getElementById('statTotal').textContent = bookings.length;
        document.getElementById('statConfirmed').textContent = bookings.filter(b => b.status === 'confirmed').length;
        document.getElementById('statPending').textContent = bookings.filter(b => b.status === 'pending').length;
        staggerIn(tbody, 'tr', 0.03);
    }

    document.querySelectorAll('#bookingFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#bookingFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    document.getElementById('pageSearch').addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
    });

    render();
});
