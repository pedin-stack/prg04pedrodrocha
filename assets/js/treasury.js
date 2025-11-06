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

    // --- LÓGICA DOS MODAIS (CORRIGIDA) ---

    // Modal 1: Registrar Movimentação
    const movementModalEl = document.getElementById('movement-modal');
    const registerMovementBtn = document.getElementById('register-movement-btn');
    if (movementModalEl && registerMovementBtn) {
        const movementModal = new bootstrap.Modal(movementModalEl);
        registerMovementBtn.addEventListener('click', () => {
            movementModal.show();
        });
        movementModalEl.addEventListener('hidden.bs.modal', () => {
            document.getElementById('movement-form')?.reset();
        });
    }

    // Modal 2: Gerar Relatórios
    const reportsModalEl = document.getElementById('reports-modal');
    const generateReportsBtn = document.getElementById('generate-reports-btn');
    if (reportsModalEl && generateReportsBtn) {
        const reportsModal = new bootstrap.Modal(reportsModalEl);
        generateReportsBtn.addEventListener('click', () => {
            reportsModal.show();
        });
        reportsModalEl.addEventListener('hidden.bs.modal', () => {
            document.getElementById('reports-form')?.reset();
        });
    }

    // Modal 3: Balanço Simples
    const balanceModalEl = document.getElementById('balance-modal');
    const simpleBalanceBtn = document.getElementById('simple-balance-btn');
    if (balanceModalEl && simpleBalanceBtn) {
        const balanceModal = new bootstrap.Modal(balanceModalEl);
        simpleBalanceBtn.addEventListener('click', () => {
            balanceModal.show();
        });
    }

    // Modal 4 & 5: Gestão de Mensalidades e Inserção Manual
    const duesModalEl = document.getElementById('dues-modal');
    
    // LINHA CORRIGIDA: Buscando por 'manage-dues' (como está no HTML)
    const manageDuesBtn = document.getElementById('manage-dues'); 
    
    const manualDuesModalEl = document.getElementById('manual-dues-modal');
    const openManualDuesBtn = document.getElementById('open-manual-dues-btn');
    
    if (duesModalEl && manageDuesBtn && manualDuesModalEl && openManualDuesBtn) {
        const duesModal = new bootstrap.Modal(duesModalEl);
        const manualDuesModal = new bootstrap.Modal(manualDuesModalEl);

        // Gatilho para abrir a tabela de mensalidades
        manageDuesBtn.addEventListener('click', () => {
            duesModal.show();
        });

        // Gatilho para abrir o formulário de inserção manual
        openManualDuesBtn.addEventListener('click', () => {
            duesModal.hide(); 
            manualDuesModal.show();
        });

        // Faz o modal de formulário reabrir o modal da tabela ao ser fechado
        manualDuesModalEl.addEventListener('hidden.bs.modal', () => {
            duesModal.show();
        });
    }
});