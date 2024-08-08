
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verifica si el token y el rol están presentes
    if (!token || !role) {
        // Si no hay token o rol, redirige a la página de login
        window.location.href = 'login.html';
    } else {
        // Si el token está presente, se puede hacer una solicitud para obtener más datos si es necesario
        fetch('http://52.15.107.129:8081/usuarios/get_info_user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(userData => {
            // Mostrar la información del usuario en el dashboard
            // document.getElementById('username').textContent = userData.usuario[1]; // Ejemplo: mostrar nombre de usuario
        })
        .catch(error => {
            console.error('Error obteniendo información del usuario:', error);
            // En caso de error, redirige al login
            //window.location.href = 'login.html';
        });
    }

    // Función para manejar el cierre de sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });
});
