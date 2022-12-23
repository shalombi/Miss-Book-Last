export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <img class="prev-img" :src="book.thumbnail"/>
            <h2>{{ book.title }}</h2>
            <h3 v-if="book.listPrice" >price: {{ book.listPrice.amount}} {{setCurrency}}</h3>
        </section>
    `,
    data() {
        return {
            // book: this.book
        }
    },
    computed: {
        setCurrency() {
            const strCurrency = this.book.listPrice.currencyCode
            if (strCurrency === 'ILS') return ('₪')
            if (strCurrency === 'EUR') return ('€')
            if (strCurrency === 'USD') return ('$')  
        }
    }

    ,
}