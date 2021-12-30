const TransactionUL = document.querySelector('#transactions')
const IncomeDisplay = document.querySelector('#money-plus')
const ExpenseDisplay = document.querySelector('#money-minus')
const BalanceDisplay = document.querySelector('#balance')
const Form = document.querySelector('#form')
const InputTransactionName = document.querySelector('#text')
const InputTransactionAmount = document.querySelector('#amount')








const LocalStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? LocalStorageTransactions : []

const RemoveTransaction = function (ID){
   transactions = transactions
    .filter(transaction => transaction.id !== ID)
    UpdateLocalStorage()
    init()
}

const DummyTransactionIntoDOM = transaction =>{
    const operator = transaction.Amount < 0 ? '-' : '+'
    const cssClass = transaction.Amount < 0 ? 'minus' : 'plus'
    const AmountWithoutOperator = Math.abs(transaction.Amount);
    const li = document.createElement('li')
    console.log(li)
    li.classList.add(cssClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${ AmountWithoutOperator}</span>
    <button onclick="RemoveTransaction(${transaction.id})" class="delete-btn">x</button>
    `
    TransactionUL.prepend(li)
   
}

const UpdateBalanceValues = ()=>{
    const TransactionsAmount =transactions.map(transaction => transaction.Amount)
    const Total = TransactionsAmount
    .reduce((accumulator, transaction)=> accumulator + transaction, 0)
    .toFixed(2)
    const Income = TransactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value)=> accumulator + value, 0)
    .toFixed(2)
    const Expense = Math.abs(TransactionsAmount
        .filter(value => value < 0)
        .reduce((accumulator, value)=> accumulator + value, 0))
    .toFixed(2)
    
    BalanceDisplay.textContent = `R$ ${Total}`
    IncomeDisplay.textContent = `R$ ${Income}`
    ExpenseDisplay.textContent = `R$ ${Expense}`
}

const init = ()=>{
    TransactionUL.innerHTML =''
   transactions.forEach(DummyTransactionIntoDOM)
    UpdateBalanceValues()
}

init()

const UpdateLocalStorage = ()=>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const GenerateID = ()=> Math.round(Math.random() * 1000)

Form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const TransactionName = InputTransactionName.value.trim()
    const TransactionAmount = InputTransactionAmount.value.trim() 

    if(TransactionName === '' || TransactionAmount === ''){
        alert('Porfavor Preencha o Nome e Valor da Transação')
        
        return
    }

    const Transaction = {
         id:GenerateID(),
         name:TransactionName,
         Amount:Number(TransactionAmount)}

    
   transactions.push(Transaction)
    init()
    UpdateLocalStorage()

    InputTransactionName.value =''
    InputTransactionAmount.value =''
})