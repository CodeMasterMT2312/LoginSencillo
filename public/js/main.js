document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#login-form");
    
    loginForm.addEventListener("submit", function(event) {
        const username = document.querySelector('input[name="username"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        if (username === "" || password === "") {
            event.preventDefault(); // Evita el envío del formulario
            alert("Por favor, completa todos los campos.");
        } else {
            // Los datos se enviarán automáticamente al servidor si la validación pasa
        }
    });
});
