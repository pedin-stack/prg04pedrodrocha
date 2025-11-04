document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA SIDEBAR ---
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebar && !localStorage.getItem('sidebarState')) {
        sidebar.classList.add('collapsed');
    }
    
    const loadSidebarState = () => {
        const state = localStorage.getItem('sidebarState');
        if (state === 'collapsed') {
            sidebar.classList.add('collapsed');
        } else if (state === 'expanded') {
            sidebar.classList.remove('collapsed');
        }
    };

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            const state = sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded';
            localStorage.setItem('sidebarState', state);
        });
    }
    loadSidebarState();

    // --- LÓGICA DOS MODAIS BOOTSTRAP ---
    
    // 1. Inicializa os modais
    const movementModalEl = document.getElementById('movement-modal');
    const reportsModalEl = document.getElementById('reports-modal');
    const balanceModalEl = document.getElementById('balance-modal'); // NOVO
    
    if (movementModalEl && reportsModalEl && balanceModalEl) {
        const movementModal = new bootstrap.Modal(movementModalEl);
        const reportsModal = new bootstrap.Modal(reportsModalEl);
        const balanceModal = new bootstrap.Modal(balanceModalEl); // NOVO

        // 2. Adiciona os gatilhos para abrir os modais
        document.getElementById('register-movement-btn').addEventListener('click', () => {
            movementModal.show();
        });

        document.getElementById('generate-reports-btn').addEventListener('click', () => {
            reportsModal.show();
        });

        // Gatilho para o novo modal
        document.getElementById('simple-balance-btn').addEventListener('click', () => {
            balanceModal.show();
        });

        // 3. Limpa formulários ao fechar (Opcional)
        movementModalEl.addEventListener('hidden.bs.modal', () => {
            document.getElementById('movement-form').reset();
        });

        reportsModalEl.addEventListener('hidden.bs.modal', () => {
            document.getElementById('reports-form').reset();
        });
    }

    // Gatilho para a página de mensalidades
    const manageDuesCard = document.getElementById('manage-dues');
    if (manageDuesCard) {
        manageDuesCard.addEventListener('click', () => {
            window.location.href = 'mensalidades.html'; 
        });
    }
});