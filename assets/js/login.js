document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('main.login-container form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // impede envio real
    // pegar valores se quiser validar:
    // const email = form.querySelector('#email').value;
    // const pwd = form.querySelector('#password').value;

    // TODO: aqui você pode validar/checar credenciais; por enquanto redireciona direto:
    //ps: peguei de i.a mas depois eu refatoro
    window.location.href = 'hub-page.html';
  });
});