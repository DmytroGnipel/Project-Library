let bookStorage = []
let divMain = document.getElementById('main')

function addInputs () {
    for (let i = 0; i <=library.length - 1; i++) {
        let input = document.createElement('input')
        if (getNameParameters(library)[i] === 'isread') input.placeholder = 'do you read this book?'
        else if (getNameParameters(library)[i] === 'pages') input.placeholder = 'how much pages the book has?'
        else input.placeholder = `enter ${getNameParameters(library)[i]}`
        divMain.insertAdjacentElement('afterbegin', input)
    }
}

function library(title, author, pages, isread) {//constructor for filling library
    this.title = title
    this.author = author
    this.pages = pages
    this.isread = isread
}
library.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.isread}`}

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
        let input = document.createElement('input')
        if (getNameParameters(library)[i] === 'isread') input.placeholder = "do you read this book? Only 'yes' or 'no'"
        else if (getNameParameters(library)[i] === 'pages') input.placeholder = 'how much pages the book has? Enter a number'
        else input.placeholder = `enter ${getNameParameters(library)[i]}`
        divMain.appendChild(input)
    }
}

let button = document.createElement('button')
button.textContent = 'NEW BOOK'
button.addEventListener('click', function() {
        addInputs()
        button.textContent = 'SEND TO LIBRARY'
    }
    else craeteObject()
    
})
divMain.insertAdjacentElement("beforeend", button)





function craeteObject() {//add object with the book to array
let inputs = document.getElementsByTagName('input')
let object = new library(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
bookStorage.push(object)
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
            cell.textContent = array[counter].info()
            row.appendChild(cell)
            counter++
        }
        }
        table.appendChild(row)
    }
    divMain.insertAdjacentElement('afterbegin', table)
}