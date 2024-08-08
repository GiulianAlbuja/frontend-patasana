document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verifica si el token y el rol están presentes
    if (!token || !role) {
        window.location.href = 'login.html';
    } else {
        // Obtener la información del usuario
        fetch('http://52.15.107.129:8081/usuarios/get_info_user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(userData => {
            // Mostrar el nombre del usuario
            document.getElementById('username').textContent = userData.usuario[1];
        })
        .catch(error => {
            console.error('Error obteniendo información del usuario:', error);
            //window.location.href = 'login.html';
        });

        // Obtener la lista de mascotas
        fetch('http://52.15.107.129:8082/mascotas/listar', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Llenar la tabla con los datos de las mascotas
            llenarTablaMascotas(data.mascotas);
        })
        .catch(error => {
            console.error('Error obteniendo la lista de mascotas:', error);
        });

        // Obtener la lista de usuarios
        fetch('http://52.15.107.129:8081/usuarios/get_users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Llenar la tabla con los datos de los usuarios
            llenarTablaUsuarios(data.usuarios);
        })
        .catch(error => {
            console.error('Error obteniendo la lista de usuarios:', error);
        });

        // Obtener la lista de visitas
        fetch('http://52.15.107.129:8083/visitas/listar', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Llenar la tabla con los datos de las visitas
            llenarTablaVisitas(data.visitas);
        })
        .catch(error => {
            console.error('Error obteniendo la lista de visitas:', error);
        });
    }

    // Función para manejar el cierre de sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });
});

// Función para llenar la tabla con datos de mascotas
function llenarTablaMascotas(mascotas) {
    const tablaMascotas = document.getElementById('tablaMascotas').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevas filas
    tablaMascotas.innerHTML = '';

    // Recorrer las mascotas y agregar filas a la tabla
    mascotas.forEach(mascota => {
        const fila = tablaMascotas.insertRow();
        fila.insertCell(0).innerText = mascota[0]; // ID
        fila.insertCell(1).innerText = mascota[1]; // Nombre
        fila.insertCell(2).innerText = mascota[2]; // Raza
        fila.insertCell(3).innerText = mascota[3]; // Especie
        fila.insertCell(4).innerText = mascota[4]; // Edad
        fila.insertCell(5).innerText = mascota[5]; // Observaciones
    });
}

// Función para llenar la tabla con datos de usuarios
function llenarTablaUsuarios(usuarios) {
    const tablaUsuarios = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevas filas
    tablaUsuarios.innerHTML = '';

    // Recorrer los usuarios y agregar filas a la tabla
    usuarios.forEach(usuario => {
        const fila = tablaUsuarios.insertRow();
        fila.insertCell(0).innerText = usuario[0]; // ID
        fila.insertCell(1).innerText = usuario[1]; // Nombre
        fila.insertCell(2).innerText = usuario[2]; // Correo
    });
}

// Función para llenar la tabla con datos de visitas
function llenarTablaVisitas(visitas) {
    const tablaVisitas = document.getElementById('tablaVisitas').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevas filas
    tablaVisitas.innerHTML = '';

    // Recorrer las visitas y agregar filas a la tabla
    visitas.forEach(visita => {
        const fila = tablaVisitas.insertRow();
        fila.insertCell(0).innerText = visita[1]; // Fecha
        fila.insertCell(1).innerText = visita[2]; // Correo
        fila.insertCell(2).innerText = visita[3]; // Observaciones
        fila.insertCell(3).innerText = visita[4]; // Mascota
    });
}

