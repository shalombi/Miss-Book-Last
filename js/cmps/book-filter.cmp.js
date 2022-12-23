export default {
    template: `

            <section class="book-filter">

            <div>
                Search title:
             <input 
                    @input="filter"
                    v-model="filterBy.title" 
                    type="text" 
                    placeholder="Search title">
            </div>

            <div >
            from price: 
            <input 
                    @input="filter"
                    v-model="filterBy.price.fromPrice" 
                    type="number" 
                    placeholder="from price">
            </div>

            <div >
            to price: 
            <input 
                    @input="filter"
                    v-model="filterBy.price.toPrice" 
                    type="number" 
                    placeholder="to price">
            </div >

            </section>


    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: {
                    name: 'xx',
                    fromPrice: 0,
                    toPrice: Infinity
                }

            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}