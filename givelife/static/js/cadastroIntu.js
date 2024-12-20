document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Seleciona os elementos do formulário
    const name = document.getElementById("institution-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const cnpj = document.getElementById("cnpj").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Mensagem de erro inicial vazia
    let message = "";

    // Valida se todos os campos estão preenchidos
    if (!name || !phone || !email || !cep || !password || !confirmPassword || !cnpj) {
        message = "Por favor, preencha todos os campos.";
    }
    // Valida o comprimento da senha
    else if (password.length < 8) {
        message = "A senha deve ter pelo menos 8 caracteres.";
    }
    // Verifica se as senhas coincidem
    else if (password !== confirmPassword) {
        message = "As senhas não coincidem.";
    }
    // Valida o CNPJ (14 dígitos)
    else if (cnpj.length !== 14) {
        message = "O CNPJ deve ter 14 dígitos.";
    }

    // Exibe a mensagem de erro, se houver
    if (message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        alert("Cadastro realizado com sucesso!");
        // Aqui você pode adicionar o código para enviar o formulário
    }
});