document.addEventListener('DOMContentLoaded', () => {
    const openModal = id => document.getElementById(id) && (document.getElementById(id).style.display = 'flex');
    const closeModal = id => document.getElementById(id) && (document.getElementById(id).style.display = 'none');

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.target));
    });

    // Ao clicar em Editar: abrir modal e preencher campos apenas tela, não tem utilidade
    document.querySelectorAll('.btn.edit').forEach((btn) => {
        btn.addEventListener('click', () => {
            const tr = btn.closest('tr');

            if(!tr){
                return;
            } 
 
            openModal('edit-user-modal');
        });
    });

});
