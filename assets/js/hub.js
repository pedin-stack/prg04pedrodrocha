document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    sidebar.classList.add('collapsed');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
});