import { storageService } from "../services/async-storage.service.js"


export default {
    template: `
        <section class="list-api" v-if="booksApi">
            <h1>list api</h1>
            <ul>
                <li v-for="book in booksApi">
                    <h4>{{book.title}} 
                         <button @click="add(book)">+</button>
                     </h4> 
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            dataApiKey: 'api_books',
            localStorageKey: 'books',
            booksApi: null
        }
    },
    methods: {
        loadBooks() {
            storageService.query(this.dataApiKey)
                .then(books => this.booksApi = books)
        },
        add(book) {
            storageService.post(this.localStorageKey, book)
                .then(() => {
                    this.$router.push('/book')
                })
        }
    }
    ,
    created() {
        this.loadBooks()
    },
    computed: {

    }
}