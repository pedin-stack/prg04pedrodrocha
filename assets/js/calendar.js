document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'Criar evento',
        click: function() {
          // mostrar painel de formulário
          var panel = document.getElementById('event-form-panel')
          if (!panel) return
          panel.style.display = 'block'
          panel.setAttribute('aria-hidden', 'false')
        }
      }
    }
  });

  calendar.render();
  // helpers para o painel de criação
  function parseBrazilianDate(s) {
    if (!s) return null
    s = s.trim()
    var sep = s.indexOf('/') !== -1 ? '/' : (s.indexOf('-') !== -1 ? '-' : null)
    if (!sep) return null
    var parts = s.split(sep)
    // dd/mm/yyyy or dd-mm-yyyy
    if (parts.length === 3 && parts[2].length === 4) {
      var day = parseInt(parts[0], 10)
      var month = parseInt(parts[1], 10) - 1
      var year = parseInt(parts[2], 10)
      return new Date(year, month, day)
    }
    // yyyy-mm-dd fallback
    if (parts.length === 3 && parts[0].length === 4) {
      var yearF = parseInt(parts[0], 10)
      var monthF = parseInt(parts[1], 10) - 1
      var dayF = parseInt(parts[2], 10)
      return new Date(yearF, monthF, dayF)
    }
    return null
  }

  var btnCreate = document.getElementById('evt-create')
  var btnCancel = document.getElementById('evt-cancel')
  var panel = document.getElementById('event-form-panel')

  if (btnCancel) btnCancel.addEventListener('click', function(){
    if (panel){ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true') }
  })

  if (btnCreate) btnCreate.addEventListener('click', function(){
    var title = document.getElementById('evt-title').value.trim()
    var dateStr = document.getElementById('evt-date').value.trim()
    if (!title){ alert('Informe o nome do evento.'); return }
    var date = parseBrazilianDate(dateStr)
    if (!date || isNaN(date.valueOf())){ alert('Data inválida. Use dd-mm-aaaa ou dd/mm/aaaa.'); return }
    calendar.addEvent({ title: title, start: date, allDay: true })
    alert('Evento "' + title + '" criado para ' + date.toLocaleDateString('pt-BR'))
    if (panel){ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true') }
    // limpar campos
    document.getElementById('evt-title').value = ''
    document.getElementById('evt-date').value = ''
  })
});