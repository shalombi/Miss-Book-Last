import { utilService } from './util-service.js'
import { starterBooks } from './starter-books.js'
import { apiDataBooks } from './api-data.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'books'
const API_BOOKS_KEY = 'api_books'
_createBooks()

export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
    get,
    getNextBookId,
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // utilService.saveToStorage(BOOKS_KEY, books)

    return storageService.remove(BOOKS_KEY, bookId)
}


function save(book) {
    // book.id = utilService.makeId()
    // const books = query()
    // books.push(book)
    // utilService.saveToStorage(BOOKS_KEY, books)
    // return book
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    }
    else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        thumbnail: (Math.random() > 0.5) ? "http://coding-academy.org/books-photos/11.jpg" : "http://coding-academy.org/books-photos/10.jpg",
        listPrice: {
            amount: '',
            currencyCode: "EUR",
            isOnSale: true
        }
    }
}
// TODO: refactor to this function with diff argument
// TODO: refactor to this function with CR tal about paging 

function getNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1

            // if (idx === 0) idx = books.length
            // console.log()
            return books[idx + 1].id
            // return {
            //     nextBookId: books[idx + 1].id,
            //     prevBookId: books[idx - 1].id
            // }
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    let apiBooks = utilService.loadFromStorage(API_BOOKS_KEY)

    if (!books || !books.length) {
        books = []
        books = starterBooks.getgBooks()
        utilService.saveToStorage(BOOKS_KEY, books)
    }

    if (!apiBooks || !apiBooks.length) {
        apiBooks = []
        apiBooks = apiDataBooks.getApiBooks()
        let items = apiBooks.items
        let normalizeBooks = normalizeObjects(items)
        utilService.saveToStorage(API_BOOKS_KEY, normalizeBooks)
    }
    return [books, apiBooks]
}

// console.log('books', utilService.loadFromStorage(BOOKS_KEY))
// normalizeObjects(utilService.loadFromStorage(API_BOOKS_KEY))
// publishedDate - dismiss

function normalizeObjects(books) {
    const normalizeObjs = books.map(book => normalizeObject(book))
    console.log('*** normalizeObjs ***', normalizeObjs)
    return normalizeObjs
}

function normalizeObject(bookObj) {
    // console.log('normalizeObject')
    const isSale = (bookObj.saleInfo.saleability === "NOT_FOR_SALE") ? false : true

    const newObj = {
        id: bookObj.id,
        title: bookObj.volumeInfo.title,
        thumbnail: bookObj.volumeInfo.imageLinks.thumbnail,
        pageCount: bookObj.volumeInfo.pageCount,
        description: bookObj.volumeInfo.description,
        listPrice: { isOnSale: isSale }
    }
    return newObj
}

