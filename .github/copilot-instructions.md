## Instruções rápidas para agentes de IA

Este repositório contém um frontend estático para o sistema SIGECAP (HTML/CSS/JS). As instruções abaixo mostram o que é importante saber para ser imediatamente produtivo aqui.

- Arquitetura geral: páginas HTML estáticas na raiz (`events.html`, `hub-page.html`, `login-page.html`, `treasury.html`) com ativos em `assets/`:
  - CSS: `assets/css/*.css` (cada página importa seu CSS específico, ex.: `events.html` usa `events.css` e `treasury.css`).
  - JS: `assets/js/*.js` (comportamento por página: `events.js`, `hub.js`, `relatorio.js`, `movimentaçãofincanceira.js`).
  - Imagens e ícones: `assets/images/` e `assets/icons/`.

- Ponto principal: é um app cliente (sem build system). Não há package.json, bundler, nem backend implementado aqui — arquivos são servidos estaticamente. Para testar, abra os HTML no navegador ou sirva a pasta com um servidor estático (veja seção "Como rodar localmente").

- Padrões e convenções detectáveis:
  - Inicialização JS via DOMContentLoaded em todos os arquivos JS (ex.: `assets/js/events.js`).
  - Modais seguem o padrão: elemento com classe `modal-overlay` (id único) contendo `.modal-content`; botões de fechar têm `data-target="<modal-id>"`. Use `openModal(id)` / `closeModal(id)` ou manipular `style.display` conforme o código existente (`events.js`, `relatorio.js`).
  - Sidebar: toggling via `#toggle-btn` que alterna a classe `collapsed` em `.sidebar` (`assets/js/hub.js` e `relatorio.js`).
  - FullCalendar é carregado via CDN em `events.html` (script: `https://cdn.jsdelivr.net/npm/fullcalendar@6.1.9/index.global.min.js`) e os eventos atuais são definidos inline em `assets/js/events.js` (array hardcoded `events: [...]`).

- Integração e pontos de extensão comuns:
  - Para substituir dados hardcoded (ex.: eventos), modifique `assets/js/events.js` e troque a propriedade `events: [...]` por uma chamada fetch ao seu backend, retornando um array no formato FullCalendar ({title, date, allDay}). Exemplo: `fetch('/api/events').then(r=>r.json()).then(data=>calendar.addEventSource(data))`.
  - FontAwesome e Google Fonts são carregados por URLs externas; cuida ao fazer alterações off-line.

- Problemas / peculiaridades a observar:
  - Nomes de arquivos com caracteres acentuados (`movimentaçãofincanceira.js`) podem causar problemas em ambientes que não usam UTF-8 no sistema de arquivos ou em algumas integrações CI. Se for necessário, sugira renomear para `movimentacao-financeira.js` e atualizar referências.
  - `assets/js/login.js` e `README.md` estão vazios — indica funcionalidades faltantes ou placeholders.

- Exemplos concretos (copiar/colar quando necessário):
  - Abrir modal de marcar evento (baseado em `events.js`):
    - `document.getElementById('event-date').value = info.dateStr; openModal('mark-event-modal');`
  - Ativar modo gerenciamento de eventos (adiciona dateClick):
    - `calendar.setOption('dateClick', handleDateClick);`

- Como rodar localmente (rápido):
  - Recomendado usar um servidor estático ao invés de abrir arquivos diretamente (evita problemas de CORS ao testar integrações):

```powershell
# com Python (Windows PowerShell)
python -m http.server 8000
# então abra http://localhost:8000/events.html
```

- Debug e validação:
  - Abra DevTools (Console) para ver erros JS e checar se os assets são servidos corretamente.
  - Verifique se o FullCalendar foi carregado (procure `FullCalendar` no console) antes de instanciar o calendário.

- Ao alterar estilos/scripts:
  - Mantenha a organização atual: arquivos por página em `assets/css` e `assets/js`.
  - Evite alterar markup global (por ex., classes de modal/sidebar) sem atualizar todos os scripts que dependem deles.

Se precisar mesclar este arquivo com instruções pré-existentes, preserve exemplos de código existentes e adicione notas sobre os pontos destacados acima. Se quiser, posso também gerar snippets de fetch para integrar um backend ou renomear arquivos com acentuação e atualizar referências automaticamente — diga qual opção prefere.
