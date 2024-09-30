// Importa las clases de la blockchain y la transacción
import { Blockchain, Transaction } from '../src/blockchain.js';

// Crea una instancia de la blockchain
const savjeeCoin = new Blockchain();

// Función para manejar el envío de transacciones
function handleTransactionSubmit(event) {
    event.preventDefault();
    
    // Obtén los valores del formulario
    const fromAddress = document.getElementById('fromAddress').value;
    const toAddress = document.getElementById('toAddress').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    // Crea una nueva transacción y la agrega a la lista de transacciones pendientes
    const newTransaction = new Transaction(fromAddress, toAddress, amount);
    newTransaction.signTransaction(); // Aquí podrías necesitar la clave privada del usuario
    savjeeCoin.addTransaction(newTransaction);
    
    // Actualiza la lista de transacciones
    renderTransactions();
}

// Función para manejar el evento de clic en el botón "Minar"
function handleMineButtonClick() {
    savjeeCoin.minePendingTransactions('recompensaAddress'); // Aquí podría ser la dirección del usuario
    renderBlocks();
    renderBalances();
}

// Función para renderizar la lista de transacciones
function renderTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    savjeeCoin.pendingTransactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `From: ${transaction.fromAddress}, To: ${transaction.toAddress}, Amount: ${transaction.amount}`;
        transactionList.appendChild(listItem);
    });
}

// Función para renderizar la lista de bloques
function renderBlocks() {
    const blockList = document.getElementById('block-list');
    blockList.innerHTML = '';
    savjeeCoin.chain.forEach(block => {
        const listItem = document.createElement('li');
        listItem.textContent = `Block ${block.index} - Hash: ${block.hash}`;
        blockList.appendChild(listItem);
    });
}

// Función para renderizar los balances
function renderBalances() {
    const balanceInfo = document.getElementById('balance-info');
    balanceInfo.innerHTML = '';
    // Aquí podrías obtener y mostrar los balances de las direcciones relevantes
}

// Agrega los event listeners a los elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    transactionForm.addEventListener('submit', handleTransactionSubmit);

    const mineButton = document.getElementById('mine-button');
    mineButton.addEventListener('click', handleMineButtonClick);
});
