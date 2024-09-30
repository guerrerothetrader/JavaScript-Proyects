const loadUsersFromLocalStorage = () => {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
};

const saveUsersToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

let users = loadUsersFromLocalStorage(); // Cargar usuarios de Local Storage

const createUser = (username, password) => {
    let _password = password; // Variable privada

    return {
        getUsername: () => username,
        authenticate: (inputPassword) => {
            return _password === inputPassword;
        },
        changePassword: (oldPassword, newPassword) => {
            if (_password === oldPassword) {
                _password = newPassword;
                return true;
            }
            return false;
        }
    };
};

const registerUser = (username, password) => {
    const user = createUser(username, password);
    users.push(user);
    saveUsersToLocalStorage(); // Guardar usuarios en Local Storage
    return user;
};

const authenticateUser = (username, password) => {
    const user = users.find(u => u.getUsername() === username);
    if (user && user.authenticate(password)) {
        return true;
    }
    return false;
};

// Registrar usuarios predefinidos para pruebas
registerUser('john_doe@gmail.com', 'initialPassword123');
registerUser('jane_smith@gmail.com', 'password456');

// Manejar suscripción del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(email, password)) {
        alert('Login completado');
    } else {
        alert('Email o contraseña inválidos');
    }
});

// Manejar enlace de registro
document.getElementById('registerLink').addEventListener('click', function(event) {
    event.preventDefault();

    const email = prompt('Introduce tu Email:');
    const password = prompt('Introduce tu contraseña:');
    const confirmPassword = prompt('Confirma tu contraseña:');

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden!');
        return;
    }

    const user = registerUser(email, password);
    if (user) {
        alert('Registro completado con éxito');
    } else {
        alert('Registro fallido.');
    }
});
