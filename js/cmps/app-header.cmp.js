export default {
    template: `
        <header class="app-header">
            <img src="../../img/logo.jpeg" />
            <h1 class="header-text"> Books Shop  </h1><span class="header-dot"> .</span>

            <nav class="nav">
                <router-link class="router-link" to="/"> Home </router-link> |
                <router-link class="router-link" to="/about"> About </router-link> | 
                <router-link class="router-link" to="/book">Books</router-link> |
                <router-link class="router-link" to="/book/api">Add book api</router-link>

            </nav>
            
        </header>
    `,
}