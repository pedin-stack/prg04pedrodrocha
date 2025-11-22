import React, { useState, useEffect } from 'react';

import Sidebar from '../components/sideBar/Sidebar';
// Estilos específicos da área de usuários
import '../assets/css/Users.css';
import UserTable from '../components/Table/UserTable';
import EditUserModal from '../components/modals/EditUserModal';

// Dados fictícios (simulando API)
const initialUsers = [
  { id: 1, name: 'Antônio Silva', email: 'antonio@gmail.com', role: 'Maçom' },
  { id: 2, name: 'Mario Costa', email: 'mario@outlook.com', role: 'Tesoureiro' },
  { id: 3, name: 'João Pereira', email: 'joao@example.com', role: 'Membro' },
];

function User() {
  // Estado da Sidebar (Persistência no LocalStorage igual ao seu JS original)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarState');
    return savedState === 'collapsed' || savedState === null; // Padrão fechado se null
  });

  // Estado dos Usuários
  const [users, setUsers] = useState(initialUsers);

  // Estado do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Função para alternar sidebar
  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebarState', newState ? 'collapsed' : 'expanded');
  };

  // Função para abrir o modal de edição
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container">
      {/* Aside Bar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      <main className="main-content">
        <header className="page-header">
          <h1>Usuários</h1>
        </header>

        <section className="users-panel">
          {/* UserTable composta por TableItems */}
          <UserTable 
            users={users} 
            onEditUser={handleEditUser} 
          />
        </section>
      </main>

      {/* Modal Overlay */}
      <EditUserModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        user={selectedUser} 
      />
    </div>
  );
}

export default User;