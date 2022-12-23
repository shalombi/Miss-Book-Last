import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookEdit from './book-edit.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

export default {
    template: `
    <section class="book-app" v-if="books">
        <book-filter  @filter="filter"/>
        <router-link class="router-link" to="/book/edit">Add a book</router-link>
        <book-list 
            
            @selected="selectBook" 
            @remove="removeBook" 
            :books="booksToShow"/>

        <book-details 
            @close="selectedBook = null" 
            v-if="selectedBook" 
            :book="selectedBook"/>
    </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {

                title: '',
                price: {
                    name: 'xx',
                    fromPrice: 0,
                    toPrice: Infinity
                }
            },

        }
    },
    created() {
        bookService.query()
            .then(books => {
                this.books = books
            })
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)

                    const msg = {
                        txt: `Book-${bookId} deleted`,
                        type: 'success'
                    }

                    eventBus.emit('user-msg', msg)
                })

        },
        selectBook(book) {
            this.selectedBook = book
        },
        bookSaved(book) {
            this.books.push(book)
        },
        filter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        booksToShow() {
            // if()//toPrice
            // const regex = new RegExp(this.filterBy.price.fromPrice, 'i')
            // if(this.books.filter(book => book.listPrice.amount >= this.filterBy.price.fromPrice )    this.filterBy.price.fromPrice)
            // book.listPrice.amount
            // const regex = new RegExp(this.filterBy.price.fromPrice, 'i')
            // console.log(filteredByPrice, '^^^filtered by price^^^')

            const regex = new RegExp(this.filterBy.title, 'i')

            if (this.filterBy.price.fromPrice) {
                const filteredByPrice = this.books.filter(book => {
                    return (book.listPrice.amount >= this.filterBy.price.fromPrice) && (book.listPrice.amount <= this.filterBy.price.toPrice) && (regex.test(book.title))
                })
                return filteredByPrice
            }
            else {
                const regex = new RegExp(this.filterBy.title, 'i')
                return this.books.filter(book => regex.test(book.title))
            }
        }
    },
    components: {
        bookFilter,
        bookDetails,
        bookEdit,
        bookList,
    }
}