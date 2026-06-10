document.addEventListener('DOMContentLoaded', () => {
    initCommon();

    const list = document.getElementById('reportsList');
    list.innerHTML = reports.map(r => `
        <div class="report-item">
            <div class="report-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div class="report-info">
                <h3>${r.title}</h3>
                <p>${r.date} · ${r.type} · ${r.size}</p>
            </div>
            <span class="status-badge status-${r.status === 'ready' ? 'confirmed' : 'pending'}">${r.status === 'ready' ? 'Ready' : 'Processing'}</span>
            <button class="btn btn-outline btn-sm report-download" ${r.status !== 'ready' ? 'disabled' : ''}>Download</button>
        </div>
    `).join('');

    staggerIn(list, '.report-item', 0.05);

    document.getElementById('btnGenerate').addEventListener('click', () => {
        openModal(`
            <h2 class="modal-title">Generate Report</h2>
            <p class="modal-subtitle">Select report type and date range</p>
            <form class="booking-form" id="reportForm">
                <div class="form-group"><label>Report Type</label><select required><option>Financial</option><option>Bookings</option><option>Clients</option><option>Analytics</option></select></div>
                <div class="form-row"><div class="form-group"><label>From</label><input type="date" required></div><div class="form-group"><label>To</label><input type="date" required></div></div>
                <div class="modal-actions"><button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button><button type="submit" class="btn btn-primary">Generate</button></div>
            </form>
        `);
        document.getElementById('reportForm').addEventListener('submit', (e) => { e.preventDefault(); closeModal(); });
    });
});
