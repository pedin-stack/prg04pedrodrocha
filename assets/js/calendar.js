document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var currentClickedEvent = null; // Variável para guardar o evento clicado

  // --- Referências para o modal de detalhes do evento ---
  var modal = document.getElementById('event-details-modal');
  var modalTitle = document.getElementById('modal-event-title');
  var memberList = document.getElementById('modal-member-list');
  var btnCloseModal = document.querySelector('#event-details-modal .close-btn');
  var btnCancelEvent = document.getElementById('modal-cancel-event');

  // --- Referências para o painel de criação ---
  var panel = document.getElementById('event-form-panel');
  var btnCreate = document.getElementById('evt-create');
  var btnCancelCreate = document.getElementById('evt-cancel');


  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br', // Adiciona tradução
    
    // Header melhorado para navegação
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addEventButton' // Botão personalizado
    },
    
    customButtons: {
      addEventButton: {
        text: 'Criar evento',
        click: function() {
          // mostrar painel de formulário
          if (!panel) return;
          panel.style.display = 'block';
          panel.setAttribute('aria-hidden', 'false');
        }
      }
    },

    // --- NOVA FUNCIONALIDADE: CLIQUE NO EVENTO ---
    eventClick: function(info) {
      info.jsEvent.preventDefault();
      currentClickedEvent = info.event; 

      if (modalTitle) modalTitle.textContent = currentClickedEvent.title;
    
      if (memberList) {
      
         memberList.innerHTML = '<li>Membro 1 (Confirmado)</li><li>Membro 2 (Confirmado)</li><li>Membro 3 (Confirmado)</li>';
       
      }

      // Exibe o modal
      if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
      }
    }
 

  });

  calendar.render();

  // --- LÓGICA DO MODAL DE DETALHES ---

  // Função para fechar o modal de detalhes
  function hideEventModal() {
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
    currentClickedEvent = null; // Limpa a referência do evento
  }

  // Listener para o botão de fechar (X)
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', hideEventModal);
  }

  // Listener para o botão "Cancelar evento"
  if (btnCancelEvent) {
    btnCancelEvent.addEventListener('click', function() {
      if (currentClickedEvent && confirm('Tem certeza que deseja cancelar o evento "' + currentClickedEvent.title + '"?')) {
        currentClickedEvent.remove(); // Remove o evento do calendário
        hideEventModal(); // Fecha o modal
        alert('Evento cancelado.');
      }
    });
  }

  // Opcional: Fechar o modal clicando fora da área de conteúdo
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      hideEventModal();
    }
  });


  // --- (Lógica existente do painel de criação) ---

  // helpers para o painel de criação
  function parseBrazilianDate(s) {
    if (!s) return null;
    s = s.trim();
    var sep = s.indexOf('/') !== -1 ? '/' : (s.indexOf('-') !== -1 ? '-' : null);
    if (!sep) return null;
    var parts = s.split(sep);
    // dd/mm/yyyy or dd-mm-yyyy
    if (parts.length === 3 && parts[2].length === 4) {
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10) - 1;
      var year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    // yyyy-mm-dd fallback
    if (parts.length === 3 && parts[0].length === 4) {
      var yearF = parseInt(parts[0], 10);
      var monthF = parseInt(parts[1], 10) - 1;
      var dayF = parseInt(parts[2], 10);
      return new Date(yearF, monthF, dayF);
    }
    return null;
  }

  if (btnCancelCreate) btnCancelCreate.addEventListener('click', function(){
    if (panel){ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true'); }
  });

  if (btnCreate) btnCreate.addEventListener('click', function(){
    var titleInput = document.getElementById('evt-title');
    var dateInput = document.getElementById('evt-date');

    var title = titleInput.value.trim();
    var dateStr = dateInput.value.trim();
    
    if (!title){ alert('Informe o nome do evento.'); return; }
    var date = parseBrazilianDate(dateStr);
    if (!date || isNaN(date.valueOf())){ alert('Data inválida. Use dd-mm-aaaa ou dd/mm/aaaa.'); return; }
    
    calendar.addEvent({ title: title, start: date, allDay: true });
    
    alert('Evento "' + title + '" criado para ' + date.toLocaleDateString('pt-BR'));
    
    if (panel){ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true'); }
    
    // limpar campos
    titleInput.value = '';
    dateInput.value = '';
  });
});