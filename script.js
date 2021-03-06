const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20},
    { id: 2, text: 'Salary', amount: 300},
    { id: 3, text: 'Book', amount: -10},
    { id: 4, text: 'Camera', amount: 150},
];

let transactions = dummyTransactions

//Add transaction
function addTransation(e) {
    e.preventDefault()

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
        return
    } 

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value
    }
    transactions.push(transaction)

    addTransactionDOM(transaction)

    updateValues()

    text.value = ''
    amount.value = ''
    text.focus()    
}

//Delete Transaction
function removeTransaction(id){
    
    transactions = transactions.filter((transaction) => transaction.id !== id)
    init()
}

function generateID() {
    return Math.floor(Math.random()*1000000000)
}

//Add transactions to DOM List
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button onclick='removeTransaction(${transaction.id})' class="delete-btn">x</button>
    `
    list.appendChild(item)
}

//Update the Balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item), 0)
                    .toFixed(2)

    const expenses = (amounts
                    .filter(item => item < 0)
                    .reduce((acc, item) => (acc += item), 0)
                    ) * -1
                    .toFixed(2)

    balance.innerText = total
    money_plus.innerText =`$${income}`
    money_minus.innerText = `-$${expenses}`


}


//Init App
function init() {
    list.innerHTML = '';

    transactions.forEach((transaction) => addTransactionDOM(transaction))
    updateValues()
}

init()

form.addEventListener('submit', addTransation)