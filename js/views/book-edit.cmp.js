import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="book-edit">
            <h1 class="book-edit-headline">Book Edit</h1>
            <form @submit.prevent="save" v-if="bookToEdit">

                <div>
                    <input type="text" v-model="bookToEdit.title" placeholder="title">
                </div>

                <div>
                    <input v-if="bookToEdit.listPrice" type="number" v-model.number="bookToEdit.listPrice.amount" placeholder="price">
                </div>
                
                <div>
                    <select v-model="bookToEdit.listPrice.currencyCode" placeholder="currency"> 
                        <option>EUR</option>
                        <option>ILS</option> 
                        <option>USD</option> 
                    </select>
                </div>

                <div>
                    <button class="save-btn">Save</button>
                </div>

            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: null
        }
    },
    created() {
        const id = this.$route.params.id
        console.log(id)
        if (id) {
            bookService.get(id)
                .then(book => {
                    this.bookToEdit = book
                })
        }
        else {
            this.bookToEdit = bookService.getEmptyBook()
        }

    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(book => {

                    // this.$emit('saved', book)
                    // this.bookToEdit = bookService.getEmptyBook()
                    const msg = {
                        txt : `Book-${book.id} saved...`,
                        type:'success'
                    }
                    this.$router.push('/book')
                    eventBus.emit('user-msg',msg)

                })

        }
    }
}