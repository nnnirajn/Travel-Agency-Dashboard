const FALLBACK_IMAGE = (document.querySelector('meta[name="base-path"]')?.content || '') + 'images/placeholder.svg';

document.addEventListener('error', (e) => {
    if (e.target.tagName !== 'IMG') return;
    const img = e.target;
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';
    img.src = FALLBACK_IMAGE;
}, true);

function staggerIn(container, selector, delayStep = 0.04) {
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    container.querySelectorAll(selector).forEach((el, i) => {
        el.classList.remove('stagger-in');
        void el.offsetWidth;
        el.style.animationDelay = `${i * delayStep}s`;
        el.classList.add('stagger-in');
    });
}

function animateStats() {
    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const prefix = el.dataset.prefix || '';
        const duration = 1200;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
            el.textContent = prefix === '$' ? prefix + current.toLocaleString() : current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

function openModal(content, type = 'default') {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    if (!overlay || !modal || !body) return;

    modal.className = 'modal';
    if (type === 'lightbox') modal.classList.add('modal-lightbox');
    if (type === 'wide') modal.classList.add('modal-wide');

    body.innerHTML = content;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function openBookingModal() {
    openModal(`
        <h2 class="modal-title">New Booking</h2>
        <p class="modal-subtitle">Create a reservation for your client</p>
        <form class="booking-form" id="bookingForm">
            <div class="form-group">
                <label for="clientName">Client Name</label>
                <input type="text" id="clientName" placeholder="Enter client name" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="destination">Destination</label>
                    <select id="destination" required>
                        <option value="">Select destination</option>
                        ${destinations.map(d => `<option>${d.name}, ${d.country}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="travelDate">Travel Date</label>
                    <input type="date" id="travelDate" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="travelers">Travelers</label>
                    <input type="number" id="travelers" min="1" max="20" placeholder="2" required>
                </div>
                <div class="form-group">
                    <label for="amount">Amount ($)</label>
                    <input type="number" id="amount" min="0" placeholder="2500" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" id="cancelBooking">Cancel</button>
                <button type="submit" class="btn btn-primary">Confirm Booking</button>
            </div>
        </form>
    `, 'wide');

    document.getElementById('cancelBooking').addEventListener('click', closeModal);
    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal();
    });
}

function openOffersModal() {
    const offers = [
        { discount: '30%', title: 'European Summer Packages', desc: 'Paris, Rome, Barcelona & more' },
        { discount: '25%', title: 'Asian Explorer Deal', desc: 'Tokyo, Bali, Kyoto bundle' },
        { discount: '20%', title: 'Island Getaway Special', desc: 'Maldives & Santorini combo' },
        { discount: '15%', title: 'Early Bird Booking', desc: 'Book 60 days ahead & save' },
    ];

    openModal(`
        <h2 class="modal-title">Summer Offers</h2>
        <p class="modal-subtitle">Exclusive deals for your clients this season</p>
        <div class="offers-list">
            ${offers.map(o => `
                <div class="offer-item">
                    <div class="offer-badge">${o.discount}</div>
                    <div class="offer-info"><h3>${o.title}</h3><p>${o.desc}</p></div>
                </div>
            `).join('')}
        </div>
    `);
}

function openDestinationModal(index) {
    const d = destinations[index];
    const largeImage = d.image.replace('w=400&h=300', 'w=900&h=600');
    openModal(`
        <div class="lightbox-content">
            <img class="lightbox-image" src="${largeImage}" alt="${d.name}, ${d.country}">
            <div class="lightbox-details">
                <h2>${d.name}</h2>
                <p class="modal-subtitle" style="margin-bottom: 0">${d.country}</p>
                <div class="lightbox-meta">
                    <span class="lightbox-tag rating">★ ${d.rating} Rating</span>
                    <span class="lightbox-tag">${d.bookings} Bookings</span>
                    <span class="lightbox-tag">From ${d.price}</span>
                </div>
            </div>
        </div>
    `, 'lightbox');
}

function initCommon() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const app = document.querySelector('.app');

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        app?.querySelector('.sidebar-backdrop')?.classList.remove('active');
    }

    if (menuToggle && sidebar && app) {
        let backdrop = app.querySelector('.sidebar-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';
            backdrop.setAttribute('aria-hidden', 'true');
            app.appendChild(backdrop);
            backdrop.addEventListener('click', closeSidebar);
        }

        menuToggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            backdrop.classList.toggle('active', isOpen);
            document.body.classList.toggle('sidebar-open', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !e.target.closest('.menu-toggle')) {
                    closeSidebar();
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeSidebar();
        });
    }

    const btnOffers = document.getElementById('btnViewOffers');
    if (btnOffers) btnOffers.addEventListener('click', openOffersModal);

    const btnBooking = document.getElementById('btnNewBooking');
    if (btnBooking) btnBooking.addEventListener('click', openBookingModal);

    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function getChartDefaults() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1a1d2e',
                titleFont: { family: 'DM Sans', size: 13, weight: '600' },
                bodyFont: { family: 'DM Sans', size: 12 },
                padding: 12,
                cornerRadius: 10,
            },
        },
        animation: { duration: 700, easing: 'easeOutQuart' },
    };
}
