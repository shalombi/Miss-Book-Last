
import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <book-preview :book="book"/>
                    <section class="actions">
                        <!-- <button @click="showDetails(book)">Details</button> -->
                        <router-link class="router-link" :to="'/book/' + book.id">Details</router-link > | 
                        <router-link class="router-link" :to="'/book/edit/' + book.id">Edit</router-link >

                        <button @click="remove(book.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(book) {
            this.$emit('selected', book)
        }
    },
    components: {
        bookPreview,
    }
}