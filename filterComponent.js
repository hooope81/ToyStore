
const filter_el = {
    data() {
        return {
            userSearch: ""
        }
    }, 
    template: `<form action="#" @submit.prevent="$parent.$refs.product.filter(userSearch)">
                    <input type="text" v-model="userSearch">
                    <button type="submit">ok</button>
                </form>`
}