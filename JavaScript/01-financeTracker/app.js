let users = [];

// Variable global para almacenar la instancia del gráfico de portafolio
let portfolioChartInstance;

// Crea un nuevo usuario
const createUser = (username, password) => {
    let _password = password;
    let portfolio = [];
    let expenses = [];

    return {
        getUsername: () => username,
        authenticate: (inputPassword) => _password === inputPassword,
        changePassword: (oldPassword, newPassword) => {
            if (_password === oldPassword) {
                _password = newPassword;
                return true;
            }
            return false;
        },
        getPortfolio: () => portfolio,
        setPortfolio: (newPortfolio) => {
            portfolio = newPortfolio;
        },
        getExpenses: () => expenses,
        setExpenses: (newExpenses) => {
            expenses = newExpenses;
        }
    };
};

// Registra un nuevo usuario
const registerUser = (username, password) => {
    const user = createUser(username, password);
    users.push(user);
    return user;
};

// Autentica un usuario
const authenticateUser = (username, password) => {
    const user = users.find(u => u.getUsername() === username);
    if (user && user.authenticate(password)) {
        saveUserData({ username, password });
        return true;
    }
    return false;
};

// Guarda los datos del usuario en el almacenamiento local
const saveUserData = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

// Obtiene los datos del usuario del almacenamiento local
const getUserData = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

// Inicializa usuarios para pruebas
registerUser('john_doe@gmail.com', 'initialPassword123');
registerUser('jane_smith@gmail.com', 'password456');

// Maneja el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(email, password)) {
        alert('Login completado');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userSection').style.display = 'block';
        document.getElementById('userEmail').innerText = email;

        const currentUser = getUserData();
        const user = users.find(u => u.getUsername() === currentUser.username);
        updatePortfolioChart(user.getPortfolio());
        updateExpenses(user.getExpenses());
    } else {
        alert('Email o contraseña inválidos');
    }
});

// Maneja el registro de usuario
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

// Navega a la sección de portafolio
document.getElementById('portfolioLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('portfolioSection').style.display = 'block';
    document.getElementById('expensesSection').style.display = 'none';
    document.getElementById('calculatorSection').style.display = 'none';

    const currentUser = getUserData();
    const user = users.find(u => u.getUsername() === currentUser.username);
    updatePortfolioChart(user.getPortfolio());
});

// Navega a la sección de gastos
document.getElementById('expensesLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('portfolioSection').style.display = 'none';
    document.getElementById('expensesSection').style.display = 'block';
    document.getElementById('calculatorSection').style.display = 'none';

    const currentUser = getUserData();
    const user = users.find(u => u.getUsername() === currentUser.username);
    updateExpenses(user.getExpenses());
});

// Navega a la sección de calculadora
document.getElementById('calculatorLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('portfolioSection').style.display = 'none';
    document.getElementById('expensesSection').style.display = 'none';
    document.getElementById('calculatorSection').style.display = 'block';
});

// Calcula el fondo de emergencia
document.getElementById('calculateButton').addEventListener('click', function() {
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
    if (!isNaN(monthlyExpenses) && monthlyExpenses > 0) {
        const emergencyFund = monthlyExpenses * 6;
        document.getElementById('emergencyFund').innerText = `Deberías ahorrar $${emergencyFund.toFixed(2)} como fondo de emergencia.`;
    } else {
        document.getElementById('emergencyFund').innerText = 'Por favor ingresa un monto válido de gastos mensuales.';
    }
});

// Agrega una nueva inversión
document.getElementById('portfolioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('investmentType').value;
    const name = document.getElementById('investmentName').value;
    const amount = parseFloat(document.getElementById('investmentAmount').value);

    if (type && name && amount) {
        const currentUser = getUserData();
        const user = users.find(u => u.getUsername() === currentUser.username);
        const portfolio = user.getPortfolio();
        portfolio.push({ type, name, amount });
        user.setPortfolio(portfolio);
        localStorage.setItem('portfolioData', JSON.stringify(portfolio));

        updatePortfolioChart(portfolio);

        document.getElementById('investmentType').value = '';
        document.getElementById('investmentName').value = '';
        document.getElementById('investmentAmount').value = '';
    }
});

// Actualiza el gráfico del portafolio
const updatePortfolioChart = (portfolio) => {
    if (portfolioChartInstance) {
        portfolioChartInstance.destroy();
    }

    const ctx = document.getElementById('portfolioChart').getContext('2d');
    const chartData = portfolio.reduce((acc, investment) => {
        const category = `${investment.type} - ${investment.name}`;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += investment.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(chartData),
        datasets: [{
            label: 'Investment Portfolio',
            data: Object.values(chartData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    portfolioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Desglose del portafolio de inversiones'
                }
            }
        }
    });

    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '';
    portfolio.forEach((investment, index) => {
        const li = document.createElement('li');
        li.innerText = `${investment.type} - ${investment.name}: $${investment.amount.toFixed(2)}`;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            const currentUser = getUserData();
            const user = users.find(u => u.getUsername() === currentUser.username);
            const portfolio = user.getPortfolio();
            portfolio.splice(index, 1);
            user.setPortfolio(portfolio);
            localStorage.setItem('portfolioData', JSON.stringify(portfolio));
            updatePortfolioChart(portfolio);
        });
        li.appendChild(deleteButton);
        portfolioList.appendChild(li);
    });
};

// Agrega un nuevo gasto
document.getElementById('expensesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (name && amount) {
        const currentUser = getUserData();
        const user = users.find(u => u.getUsername() === currentUser.username);
        const expenses = user.getExpenses();
        expenses.push({ name, amount });
        user.setExpenses(expenses);
        localStorage.setItem('expensesData', JSON.stringify(expenses));

        updateExpenses(expenses);

        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    }
});

// Actualiza la lista de gastos
const updateExpenses = (expenses) => {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerText = `${expense.name}: ${expense.amount.toFixed(2)}€`;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            const currentUser = getUserData();
            const user = users.find(u => u.getUsername() === currentUser.username);
            const expenses = user.getExpenses();
            expenses.splice(index, 1);
            user.setExpenses(expenses);
            localStorage.setItem('expensesData', JSON.stringify(expenses));
            updateExpenses(expenses);
        });
        li.appendChild(deleteButton);
        expensesList.appendChild(li);
    });

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('totalExpenses').innerText = `Gastos totales: ${totalExpenses.toFixed(2)}€`;
};
