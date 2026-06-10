document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    let searchQuery = '';

    function render() {
        const grid = document.getElementById('destinationsGrid');
        let list = destinations;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(d => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q));
        }

        grid.innerHTML = list.map((d, i) => {
            const idx = destinations.indexOf(d);
            return `
                <div class="dest-page-card" data-index="${idx}" role="button" tabindex="0">
                    <img src="${d.image}" alt="${d.name}">
                    <div class="dest-page-info">
                        <div class="dest-page-top">
                            <h3>${d.name}</h3>
                            <span class="destination-rating">${d.rating}</span>
                        </div>
                        <p class="dest-page-country">${d.country}</p>
                        <div class="dest-page-meta">
                            <span>${d.bookings} bookings</span>
                            <span class="dest-page-price">From ${d.price}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('') || '<p class="empty-cell">No destinations found.</p>';

        grid.querySelectorAll('.dest-page-card').forEach(card => {
            const open = () => openDestinationModal(+card.dataset.index);
            card.addEventListener('click', open);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        });
        staggerIn(grid, '.dest-page-card', 0.05);
    }

    document.getElementById('pageSearch').addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
    });

    render();
});
