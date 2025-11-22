import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Sidebar from '../components/sideBar/Sidebar';
import CreateEventModal from '../components/modals/CreateEventModal';
import EventDetailsModal from '../components/modals/EventDetailsModal';
// CSS Específico
import '../assets/css/calendar.css';

const Events = () => {
  // --- Estados ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Controle da sidebar
  
  // Lista de Eventos (State do React substitui a memória interna do calendário vanilla)
  const [currentEvents, setCurrentEvents] = useState([
    { id: '1', title: 'Reunião Ritualística', date: '2025-10-04' },
    { id: '2', title: 'Filantropia', date: '2025-10-18' },
    { id: '3', title: 'Iniciação', date: '2025-10-25', allDay: true }
  ]);

  // Controle dos Modais
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --- Funções de Manipulação ---

  // 1. Adicionar Evento
  const handleAddEvent = (title, dateObj) => {
    const newEvent = {
      id: String(Date.now()), // Gera um ID único simples
      title: title,
      start: dateObj, // FullCalendar aceita objeto Date JS
      allDay: true
    };
    // Adiciona ao estado (o FullCalendar atualizará automaticamente)
    setCurrentEvents([...currentEvents, newEvent]);
  };

  // 2. Clicar no Evento (Abrir Detalhes)
  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    // Cria um objeto simples com os dados do evento clicado
    const eventData = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
    };
    setSelectedEvent(eventData);
    setDetailModalOpen(true);
  };

  // 3. Deletar Evento
  const handleDeleteEvent = (eventId) => {
    setCurrentEvents(currentEvents.filter(evt => evt.id !== eventId));
  };

  // Função para toggle da sidebar (igual à página Users)
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="container">
      {/* Sidebar Reutilizável */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      <main className="main-content">
        <Header />

        <div className="calendar-wrapper" style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '12px' }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            height="auto" // ou "80vh"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'addEventButton' // Botão customizado definido abaixo
            }}
            customButtons={{
              addEventButton: {
                text: 'Criar evento',
                click: () => setCreateModalOpen(true) // Abre modal de criação via React State
              }
            }}
            events={currentEvents} // Conecta o estado do React ao calendário
            eventClick={handleEventClick} // Handler de clique
          />
        </div>
      </main>

      {/* Modais */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onSave={handleAddEvent} 
      />

      <EventDetailsModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setDetailModalOpen(false)} 
        event={selectedEvent} 
        onDelete={handleDeleteEvent} 
      />
    </div>
  );
};

export default Events;