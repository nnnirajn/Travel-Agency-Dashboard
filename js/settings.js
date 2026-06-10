document.addEventListener('DOMContentLoaded', () => {
    initCommon();

    ['profileForm', 'agencyForm'].forEach(id => {
        document.getElementById(id).addEventListener('submit', (e) => {
            e.preventDefault();
            openModal(`
                <h2 class="modal-title">Saved</h2>
                <p class="modal-subtitle">Your changes have been saved successfully.</p>
                <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px" onclick="closeModal()">Done</button>
            `);
        });
    });
});
