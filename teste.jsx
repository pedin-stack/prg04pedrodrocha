import React, { useState } from 'react';
import './componentes/src/assets/css/hub.css'; // Importe o seu CSS original aqui

// --- ÍCONES (Para manter o código limpo) ---
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconEvents = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconMembers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconTreasury = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// --- COMPONENTE 1: ITEM DO MENU ---
const SidebarItem = ({ href, icon, label, active }) => {
  return (
    <li>
      <a href={href} className={active ? "active" : ""}>
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
};

// --- COMPONENTE 2: SIDEBAR ---
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <header className="sidebar-header">
        <img src="assets/icons/favicon-96x96.png" alt="Logo" className="logo" />
        <div className="header-text">
          <span className="chapter-name">Liberdade Harmoniosa</span>
          <span className="chapter-number">Capítulo n° 387</span>
        </div>
      </header>

      <button className="toggle-btn" onClick={toggleSidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="menu-items">
        <SidebarItem href="hub-page.html" label="Dashboard" active={true} icon={<IconHome />} />
        <SidebarItem href="events.html" label="Eventos" icon={<IconEvents />} />
        <SidebarItem href="#" label="Membros" icon={<IconMembers />} />
        <SidebarItem href="treasury.html" label="Tesouraria" icon={<IconTreasury />} />
        <SidebarItem href="#" label="Configurações" icon={<IconSettings />} />
      </ul>
    </nav>
  );
};

// --- COMPONENTE 3: CARD (DASHBOARD) ---
const DashboardCard = ({ title, content, footer, isMoney }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className={isMoney ? "money" : ""}>{content}</p>
      <small>{footer}</small>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  // Estado para controlar se a sidebar está recolhida (começa true como no seu script original)
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="container">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <main className="main-content">
        <header className="page-header">
          <h1>Dashboard</h1>
          <div className="user-profile">
            <a href="/users" className="user-link">User</a>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Usando o componente de Card */}
          <DashboardCard 
            title="Próximos Eventos" 
            content="Evento nome" 
            footer="Data" 
          />
          
          <DashboardCard 
            title="Saldo em Caixa" 
            content="R$ 00,00" 
            footer="Atualizado *Último log registrado na Tesouraria*" 
            isMoney={true} 
          />

          <DashboardCard 
            title="Último Aviso" 
            content="*Aviso*" 
            footer="Enviado por: USER" 
          />
        </div>
      </main>
    </div>
  );
}