import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sideBar/Sidebar';
import DashboardCard from '../components/cards/DashboardCard';

// Importante: Importe seu arquivo CSS aqui para aplicar os estilos globais
import '../assets/css/hub.css'; 
// Estilos da área de usuários
import '../assets/css/Users.css';

const App = () => {
  const cardsData = [
    {
      title: "Próximos Eventos",
      value: "Evento nome",
      footer: "Data",
      isMoney: false
    },
    {
      title: "Saldo em Caixa",
      value: "R$ 00,00",
      footer: "Atualizado *Último log registrado na Tesouraria*",
      isMoney: true // Ativa a classe .money do CSS
    },
    {
      title: "Último Aviso",
      value: "*Aviso*",
      footer: "Enviado por: USER",
      isMoney: false
    }
  ];

  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <h1>Dashboard</h1>
        </header>

        <div className="dashboard-grid">
          {cardsData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              footerText={card.footer}
              valueClassName={card.isMoney ? 'money' : ''}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;