import React, { useState } from 'react';
import Sidebar from '../components/sideBar/Sidebar';
import DashboardCard from '../components/cards/DashboardCard';
import ModalMovment from '../components/modals/ModalMovment';
import ModalGenerateReport from '../components/modals/ModalGenerateReport';
import ModalBalance from '../components/modals/ModalBalance';
import ModalDues from '../components/modals/ModalDues';
import ModalManualDues from '../components/modals/ModalManualDues';

import '../assets/css/treasury.css'; 
// Estilos adicionais para usuários
import '../assets/css/Users.css';

const Treasury = () => {

  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  const closeManualDues = () => setActiveModal('dues');


  const OptionCard = ({ iconClass, title, description, onClick, className = '' }) => (
    <div className={`option-card ${className}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="option-icon"><i className={iconClass}></i></div>
      <div className="option-body">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
          <header className="main-header">
            <h1>Tesouraria</h1>
          </header>

          <section className="treasury-options">
            <div className="row g-4">
              
              <OptionCard 
                iconClass="fas fa-exchange-alt"
                title="Registrar Movimentação"
                description="Adicione novas entradas ou saídas no caixa do capítulo."
                onClick={() => setActiveModal('movement')}
              />

              <OptionCard 
                iconClass="fas fa-file-invoice-dollar"
                title="Gestão de Mensalidades"
                description="Controle o status de pagamento das mensalidades dos membros."
                onClick={() => setActiveModal('dues')}
              />

              <OptionCard 
                iconClass="fas fa-chart-pie"
                title="Balanço Simples"
                description="Mostra de maneira resumida os gastos recentes"
                onClick={() => setActiveModal('balance')}
              />

              <OptionCard 
                className="wide"
                iconClass="fas fa-file-alt"
                title="Geração de Relatórios"
                description="Emita relatórios detalhados sobre as movimentações financeiras."
                onClick={() => setActiveModal('reports')}
              />

            </div>
          </section>
        </main>

      {/* Renderização Condicional dos Modais */}
      
      <ModalMovment
        isOpen={activeModal === 'movement'}
        onClose={closeModal}
      />

      <ModalDues
        isOpen={activeModal === 'dues'}
        onClose={closeModal}
        onSwitchToManual={() => setActiveModal('manual-dues')}
      />

      <ModalManualDues
        isOpen={activeModal === 'manual-dues'}
        onClose={closeManualDues}
      />

      <ModalBalance
        isOpen={activeModal === 'balance'}
        onClose={closeModal}
      />

      <ModalGenerateReport
        isOpen={activeModal === 'reports'}
        onClose={closeModal}
      />

    </div>
  );
};

export default Treasury;