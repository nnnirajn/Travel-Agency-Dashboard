let revenueChart = null;

function renderChart(data) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels = data.map(d => d.label);
    const values = data.map(d => d.value);

    if (revenueChart) {
        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = values;
        revenueChart.update();
        return;
    }

    revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Revenue',
                data: values,
                backgroundColor: 'rgba(79, 140, 255, 0.8)',
                hoverBackgroundColor: 'rgba(255, 107, 107, 0.9)',
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 44,
            }],
        },
        options: {
            ...getChartDefaults(),
            plugins: {
                ...getChartDefaults().plugins,
                tooltip: {
                    ...getChartDefaults().plugins.tooltip,
                    displayColors: false,
                    callbacks: { label: (item) => `$${item.raw}k revenue` },
                },
            },
            scales: {
                x: { grid: { display: false }, border: { display: false }, ticks: { font: { family: 'DM Sans', size: 12 }, color: '#9ca3b8' } },
                y: { beginAtZero: true, border: { display: false }, grid: { color: '#f0f3fa' }, ticks: { font: { family: 'DM Sans', size: 12 }, color: '#9ca3b8', padding: 8, callback: (v) => `$${v}k` } },
            },
        },
    });
}

function renderUpcoming() {
    const list = document.getElementById('upcomingList');
    if (!list) return;
    list.innerHTML = upcomingTours.map(tour => `
        <div class="upcoming-item">
            <img class="upcoming-thumb" src="${tour.image}" alt="${tour.name}">
            <div class="upcoming-info">
                <div class="upcoming-name">${tour.name}</div>
                <div class="upcoming-meta">${tour.travelers} travelers</div>
            </div>
            <span class="upcoming-date">${tour.date}</span>
        </div>
    `).join('');
    staggerIn(list, '.upcoming-item');
}

function renderBookings(filter = 'all') {
    const tbody = document.getElementById('bookingsTable');
    if (!tbody) return;
    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    tbody.innerHTML = filtered.map(b => `
        <tr>
            <td data-label="Client"><div class="client-cell"><img class="client-avatar" src="${b.avatar}" alt="${b.client}"><div><div class="client-name">${b.client}</div><div class="client-email">${b.email}</div></div></div></td>
            <td data-label="Destination"><div class="destination-cell"><span class="destination-flag">${b.flag}</span>${b.destination}</div></td>
            <td data-label="Date">${b.date}</td>
            <td class="amount-cell" data-label="Amount">${b.amount}</td>
            <td data-label="Status"><span class="status-badge status-${b.status}">${b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
        </tr>
    `).join('');
    staggerIn(tbody, 'tr', 0.03);
}

function renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;
    grid.innerHTML = destinations.slice(0, 4).map((d, i) => `
        <div class="destination-card" data-index="${i}" role="button" tabindex="0">
            <img src="${d.image}" alt="${d.name}">
            <span class="destination-rating">${d.rating}</span>
            <div class="destination-overlay">
                <div class="destination-name">${d.name}</div>
                <div class="destination-stats">${d.country} · ${d.bookings} bookings</div>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.destination-card').forEach(card => {
        const open = () => openDestinationModal(+card.dataset.index);
        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    });
    staggerIn(grid, '.destination-card', 0.05);
}

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    renderChart(monthlyRevenue);
    renderUpcoming();
    renderBookings();
    renderDestinations();
    animateStats();

    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderChart(tab.dataset.period === 'weekly' ? weeklyRevenue : monthlyRevenue);
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderBookings(btn.textContent.toLowerCase());
        });
    });
});
