document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    // --- MODAL HELPERS ---
    const openModal = (modalId) => document.getElementById(modalId)?.style.display = 'flex';
    const closeModal = (modalId) => document.getElementById(modalId)?.style.display = 'none';
    
    document.querySelectorAll('.close-modal-btn').forEach(btn => 
        btn.addEventListener('click', () => closeModal(btn.dataset.target))
    );
    document.querySelectorAll('.modal-overlay').forEach(overlay =>
        overlay.addEventListener('click', (e) => e.target === overlay && closeModal(overlay.id))
    );

    // --- INICIALIZAÇÃO DO FULLCALENDAR ---
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // --- CONFIGURAÇÕES GERAIS ---
        initialView: 'dayGridMonth',
        locale: 'pt-br', // Tradução para o português
        height: '100%',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek manageEventsButton'
        },

        // --- DADOS DOS EVENTOS ---
        // Em um sistema real, isso viria de um banco de dados
        events: [
            { id: '1', title: 'Reunião Ritualística', date: '2025-10-04' },
            { id: '2', title: 'Filantropia', date: '2025-10-18' },
            { id: '3', title: 'Iniciação', date: '2025-10-25', allDay: true }
        ],
        
        // --- BOTÃO PERSONALIZADO ---
        customButtons: {
            manageEventsButton: {
                text: 'Gerenciar Eventos',
                click: function() {
                    // abre o modal de gerenciamento com um calendário navegável
                    openModal('manage-events-modal');
                }
            }
        },

        // --- CALLBACKS DE CLIQUE ---
        // Clique em um evento existente -> abre modal de confirmação
        eventClick: function(info) {
            document.getElementById('confirm-event-title').innerText = info.event.title;
            openModal('confirm-presence-modal');
        },

        // Clique em um dia (só funciona após clicar em "Gerenciar Eventos")
        dateClick: null // Desabilitado por padrão
    });

    // Função para lidar com o clique em uma data (para marcar novo evento)
    function handleDateClick(info) {
        openModal('mark-event-modal');
        document.getElementById('event-date').value = info.dateStr;
        // Desabilita o dateClick novamente para evitar marcações acidentais
        calendar.setOption('dateClick', null); 
    }

    // --- Gerenciamento: instância de calendário menor dentro do modal ---
    const manageCalendarEl = document.getElementById('manage-calendar');
    let manageCalendar = null;
    // Evento selecionado para confirmação
    let selectedEventForConfirmation = null;
    function initManageCalendar() {
        if (!manageCalendarEl) return;
        manageCalendar = new FullCalendar.Calendar(manageCalendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            height: 400,
            selectable: true,
            dateClick: function(info) {
                // Ao clicar em um dia no calendário de gerenciamento abre o formulário de marcação
                openModal('mark-event-modal');
                document.getElementById('event-date').value = info.dateStr;
            }
        });
        manageCalendar.render();
    }

    // Inicializa calendário de gerenciamento quando o modal abrir
    const manageBtn = document.getElementById('manage-events-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', () => openModal('manage-events-modal'));
    }

    // Observa quando o modal de gerenciamento for aberto para inicializar o calendário
    const manageModal = document.getElementById('manage-events-modal');
    if (manageModal) {
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.attributeName === 'style') {
                    const display = manageModal.style.display;
                    if (display === 'flex' && !manageCalendar) initManageCalendar();
                }
            }
        });
        observer.observe(manageModal, { attributes: true });
    }

    // --- Submeter o formulário de marcação de evento ---
    const markForm = document.querySelector('#mark-event-modal .modal-form');
    if (markForm) {
        markForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('event-name').value.trim();
            const time = document.getElementById('event-time').value;
            const desc = document.getElementById('event-description').value.trim();
            const date = document.getElementById('event-date').value;
            if (!name || !date) return;
            // cria evento (apenas no cliente)
            const eventObj = { title: name, start: date + (time ? 'T' + time : ''), extendedProps: { description: desc } };
            calendar.addEvent(eventObj);
            // se o calendário de gerenciamento existir, atualize também
            if (manageCalendar) manageCalendar.addEvent(eventObj);
            closeModal('mark-event-modal');
            // limpa o formulário
            markForm.reset();
        });
    }
    
    // --- Handlers do modal de confirmação de presença ---
    const confirmModal = document.getElementById('confirm-presence-modal');
    const confirmBtn = confirmModal?.querySelector('.submit-btn.confirm');
    const cancelBtn = confirmModal?.querySelector('.cancel-btn');
    // Ao clicar em um evento, armazenamos a referência (adiciona no eventClick acima)
    // Atualizar o eventClick para guardar o evento
    // (substituir eventClick dinamicamente)
    const originalEventClick = calendar.getOption('eventClick');
    calendar.setOption('eventClick', function(info) {
        selectedEventForConfirmation = info.event;
        document.getElementById('confirm-event-title').innerText = info.event.title;
        openModal('confirm-presence-modal');
    });

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (!selectedEventForConfirmation) return closeModal('confirm-presence-modal');
            // aqui apenas simulamos a confirmação (poderia enviar para backend)
            selectedEventForConfirmation.setProp('backgroundColor', 'var(--primary-accent-color)');
            closeModal('confirm-presence-modal');
            selectedEventForConfirmation = null;
        });
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            selectedEventForConfirmation = null;
            closeModal('confirm-presence-modal');
        });
    }
    calendar.render();
});