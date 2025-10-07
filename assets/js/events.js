document.addEventListener('DOMContentLoaded', () => {

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    };

    const openConfirmBtn = document.getElementById('open-confirm-modal-btn');
    if (openConfirmBtn) {
        openConfirmBtn.addEventListener('click', () => openModal('confirm-presence-modal'));
    }

    const manageEventsBtn = document.getElementById('manage-events-btn');
    if (manageEventsBtn) {
        manageEventsBtn.addEventListener('click', () => openModal('manage-events-modal'));
    }

    const openMarkBtn = document.getElementById('open-mark-modal-btn');
    if (openMarkBtn) {
        openMarkBtn.addEventListener('click', () => {
            closeModal('manage-events-modal'); 
            openModal('mark-event-modal');    
        });
    }

    const closeButtons = document.querySelectorAll('.close-modal-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-target');
            closeModal(modalId);
        });
    });
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
});