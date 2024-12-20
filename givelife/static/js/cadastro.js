document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const minPasswordLength = 8;

    // Função para verificar se o email é válido
    const isEmailValid = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Função para exibir uma mensagem de erro
    const showError = (input, message) => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
    };

    // Limpar mensagens de erro
    const clearErrors = () => {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((message) => message.remove());
    };

    // Validação do formulário ao enviar
    form.addEventListener('submit', (event) => {
        clearErrors();  // Limpa mensagens de erro anteriores
        let hasErrors = false;

        // Verifica se o email é válido
        if (!isEmailValid(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um e-mail válido.');
            hasErrors = true;
        }

        // Verifica o comprimento mínimo da senha
        if (passwordInput.value.length < minPasswordLength) {
            showError(passwordInput, `A senha deve ter no mínimo ${minPasswordLength} caracteres.`);
            hasErrors = true;
        }

        // Verifica se a confirmação da senha coincide com a senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'As senhas não coincidem.');
            hasErrors = true;
        }

        // Impede o envio do formulário se houver erros
        if (hasErrors) {
            event.preventDefault();
        }
    });
});