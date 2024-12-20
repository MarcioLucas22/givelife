document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const isPasswordVisible = passwordInput.type === "password";
    
    passwordInput.type = isPasswordVisible ? "text" : "password";
    
    // Altera o ícone
    this.textContent = isPasswordVisible ? "🙈" : "👁️";
});