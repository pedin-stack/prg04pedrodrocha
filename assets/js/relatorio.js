document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para o Modal de Movimentação ---
    const registerMovementBtn = document.getElementById('register-movement-btn');
    const movementModal = document.getElementById('movement-modal');
    const closeModalMovementBtn = document.getElementById('close-modal');

    if (registerMovementBtn) {
        registerMovementBtn.addEventListener('click', () => {
            movementModal.style.display = 'flex';
        });
    }

    const closeMovementModal = () => {
        movementModal.style.display = 'none';
    };

    if (closeModalMovementBtn) {
        closeModalMovementBtn.addEventListener('click', closeMovementModal);
    }
    
    if (movementModal) {
        movementModal.addEventListener('click', (event) => {
            if (event.target === movementModal) {
                closeMovementModal();
            }
        });
    }

    // --- Lógica para o Modal de Relatórios (NOVO) ---
    const generateReportsBtn = document.getElementById('generate-reports-btn');
    const reportsModal = document.getElementById('reports-modal');
    const closeModalReportsBtn = document.getElementById('close-reports-modal');

    if (generateReportsBtn) {
        generateReportsBtn.addEventListener('click', () => {
            reportsModal.style.display = 'flex';
        });
    }

    const closeReportsModal = () => {
        reportsModal.style.display = 'none';
    };



    if (closeModalReportsBtn) {
        closeModalReportsBtn.addEventListener('click', closeReportsModal);
    }

    if (reportsModal) {
        reportsModal.addEventListener('click', (event) => {
            if (event.target === reportsModal) {
                closeReportsModal();
            }
        });
    }

    // --- Lógica para a Sidebar ---
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
});