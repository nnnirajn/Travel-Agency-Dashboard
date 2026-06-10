document.addEventListener('DOMContentLoaded', () => {
    initCommon();

    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });

    const defaults = getChartDefaults();

    new Chart(document.getElementById('revenueChart'), {
        type: 'line',
        data: {
            labels: monthlyRevenue.map(d => d.label),
            datasets: [{
                data: monthlyRevenue.map(d => d.value),
                borderColor: '#4f8cff',
                backgroundColor: 'rgba(79, 140, 255, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4f8cff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            }],
        },
        options: {
            ...defaults,
            plugins: {
                ...defaults.plugins,
                tooltip: {
                    ...defaults.plugins.tooltip,
                    displayColors: false,
                    callbacks: { label: (item) => `$${item.raw}k revenue` },
                },
            },
            scales: {
                x: { grid: { display: false }, border: { display: false }, ticks: { font: { family: 'DM Sans' }, color: '#9ca3b8' } },
                y: { beginAtZero: true, border: { display: false }, grid: { color: '#f0f3fa' }, ticks: { font: { family: 'DM Sans' }, color: '#9ca3b8', callback: v => `$${v}k` } },
            },
        },
    });

    new Chart(document.getElementById('destChart'), {
        type: 'doughnut',
        data: {
            labels: destinations.map(d => d.name),
            datasets: [{
                data: destinations.map(d => d.bookings),
                backgroundColor: ['#4f8cff', '#ff6b6b', '#2dd4bf', '#a78bfa', '#ff8a65', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 6,
            }],
        },
        options: {
            ...defaults,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { family: 'DM Sans', size: 12 }, color: '#6b7289', padding: 16, usePointStyle: true, pointStyle: 'circle' },
                },
                tooltip: {
                    ...defaults.plugins.tooltip,
                    callbacks: { label: (item) => `${item.raw} bookings` },
                },
            },
        },
    });
});
