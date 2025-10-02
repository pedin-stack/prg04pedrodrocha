document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const registerMovementBtn = document.getElementById('register-movement-btn');
    const movementModal = document.getElementById('movement-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Função para abrir o modal
    const openModal = () => {
        if (movementModal) {
            movementModal.style.display = 'flex';
        }
    };

    // Função para fechar o modal
    const closeModal = () => {
        if (movementModal) {
            movementModal.style.display = 'none';
        }
    };

    // Adiciona evento de clique para abrir o modal
    if (registerMovementBtn) {
        registerMovementBtn.addEventListener('click', openModal);
    }

    // Adiciona evento de clique para fechar o modal no botão 'X'
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Adiciona evento de clique para fechar o modal ao clicar fora dele
    if (movementModal) {
        movementModal.addEventListener('click', (event) => {
            // Verifica se o clique foi no overlay (fundo) e não no conteúdo do modal
            if (event.target === movementModal) {
                closeModal();
            }
        });
    }
}); //abrindo a aba de registrar movimentação

