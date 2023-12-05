let bookStorage = []
let divMain = document.getElementById('main')

function library(title, author, pages, isread) {//constructor for filling library
    this.title = title
    this.author = author
    this.pages = pages
    this.isread = isread
}
library.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, read or not '${this.isread}'`}

function getNameParameters (func) {
    let string = func.toString()
    array = string.match(/[a-z]+,| [a-z]+\)/g)
    let newArray = []
    for (let elem of array) {
        newArray.push(elem.replace(/ |,|\)/g, ''))
    }
    return newArray
    }

function addInputs () {
    for (let i = 0; i < library.length; i++) {
        const input = document.createElement('input')
        if (getNameParameters(library)[i] === 'isread') {
            input.placeholder = "do you read this book? Only 'yes' or 'no'"
            input.setAttribute('pattern', 'yes|no')
        } else if (getNameParameters(library)[i] === 'pages') {
            input.placeholder = 'how much pages does the book have? Enter a number'
            input.setAttribute('pattern', '[0-9]+')
        }
        else input.placeholder = `enter ${getNameParameters(library)[i]}`
        input.setAttribute('required', '')
        isValid(input)
        divMain.appendChild(input)
    }
}

let button = document.createElement('button')
button.textContent = 'NEW BOOK'
button.addEventListener('click', function() {
    let input = document.querySelector('input')
    if (!input) {
        addInputs()
        button.textContent = 'SEND TO LIBRARY'
    }
    else craeteObject()
    
})
divMain.insertAdjacentElement("afterend", button)

function craeteObject() {//add object with the book to array
let inputs = document.getElementsByTagName('input')
if (inputs[0].value 
    && inputs[1].value 
    && +inputs[2].value - +inputs[2].value === 0 
    && inputs[3].value === 'yes' || inputs[3].value === 'no') {
let object = new library(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
bookStorage.push(object)
for (let elem of inputs) elem.value = ''
display(bookStorage)
}
else alert('enter correct(!) iformation about book before sending it to library')
}

let display = (array) => {//create table and add to it's cells values from array
    let oldTable = document.querySelector('table')
    if (oldTable) oldTable.remove()
    let table = document.createElement('table')
    let scaleOfTable = Math.ceil(Math.sqrt(array.length))
    let counter = 0
    for (let i = 1; i <= scaleOfTable; i++) {
        let row = document.createElement('tr')
        for (let k = 1; k <= scaleOfTable; k++) {
            if (array[counter]) {
            let cell = document.createElement('td')
            cell.dataset.number = counter
            let span = document.createElement('span')
            cell.insertAdjacentElement('afterbegin', span)
            span.textContent = array[counter].info()
            let button = document.createElement('button')
            button.textContent = 'reading status'
            button.addEventListener('click', function () {
            bookStorage[cell.dataset.number].changeReadStatus()
            let spans = document.querySelectorAll('span')
            spans[cell.dataset.number].textContent = bookStorage[cell.dataset.number].info()
            })
            cell.appendChild(button)
            row.appendChild(cell)
            counter++
        }
        }
        table.appendChild(row)
    }
    divMain.insertAdjacentElement('afterbegin', table)
    remove() // for creating button 'remove'
}

library.prototype.changeReadStatus = function() {
    if (this.isread === 'yes') this.isread = 'no'
   else if (this.isread === 'no') this.isread = 'yes'
}

function remove() {
    let cells = document.getElementsByTagName('td')
    for (let i = 0; i < bookStorage.length; i++){
    let buttonRemove = document.createElement('button')
    buttonRemove.textContent = 'delete book'
    cells[i].append(buttonRemove)
    buttonRemove.addEventListener('click', function() {
    bookStorage.splice(i, 1)
    display(bookStorage)
    })
}
}

function isValid (input) {
    input.addEventListener('input', (event) => {
        if (input.validity.valueMissing) {
            input.setCustomValidity('You must fill in this field')
        } else if (input.validity.patternMismatch) {
                    if (input.placeholder == 'how much pages does the book have? Enter a number') input.setCustomValidity('You have to use only numbers')
                    else input.setCustomValidity('You have to use solely two words: "yes" or "no"')
        } else {
            input.setCustomValidity('')
        }
        input.reportValidity()  
    })
}