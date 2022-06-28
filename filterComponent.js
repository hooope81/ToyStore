Vue.component('filter-product', {
    template: `<form action="#" @submit.prevent="$root.filter()">
                    <input type="text" v-model="$root.userValue">
                    <button type="submit">ok</button>
                </form>`
})


const filter_el = {
    data() {
        return {
            userSearch: ""
        }
    }, 
    template: `<form action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input type="text" v-model="userSearch">
                    <button type="submit">ok</button>
                </form>`
}