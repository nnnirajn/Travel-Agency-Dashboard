document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    let searchQuery = '';

    function render() {
        const grid = document.getElementById('clientsGrid');
        let list = clients;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
        }

        grid.innerHTML = list.map(c => `
            <div class="client-card">
                <img class="client-card-avatar" src="${c.avatar}" alt="${c.name}">
                <div class="client-card-body">
                    <div class="client-card-header">
                        <h3>${c.name}</h3>
                        <span class="status-badge status-${c.status === 'active' ? 'confirmed' : 'cancelled'}">${c.status}</span>
                    </div>
                    <p class="client-card-email">${c.email}</p>
                    <p class="client-card-phone">${c.phone}</p>
                    <div class="client-card-stats">
                        <div><span class="client-stat-num">${c.bookings}</span><span class="client-stat-label">Bookings</span></div>
                        <div><span class="client-stat-num">${c.spent}</span><span class="client-stat-label">Total Spent</span></div>
                    </div>
                    <p class="client-card-trip">Last trip: <strong>${c.lastTrip}</strong></p>
                </div>
            </div>
        `).join('') || '<p class="empty-cell">No clients found.</p>';

        staggerIn(grid, '.client-card', 0.05);
    }

    document.getElementById('pageSearch').addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
    });

    document.getElementById('btnAddClient').addEventListener('click', () => {
        openModal(`
            <h2 class="modal-title">Add Client</h2>
            <p class="modal-subtitle">Register a new customer profile</p>
            <form class="booking-form" id="clientForm">
                <div class="form-group"><label>Name</label><input type="text" placeholder="Full name" required></div>
                <div class="form-group"><label>Email</label><input type="email" placeholder="email@example.com" required></div>
                <div class="form-group"><label>Phone</label><input type="tel" placeholder="+1 555-0000"></div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Client</button>
                </div>
            </form>
        `);
        document.getElementById('clientForm').addEventListener('submit', (e) => { e.preventDefault(); closeModal(); });
    });

    render();
});
