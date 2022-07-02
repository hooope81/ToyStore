const filter_el = {
    data() {
        return {
            userValue: ''
        }
    },
    template: `
    <form action="#" @submit.prevent="$parent.$refs.product.filter(userValue)">
        <input type="text" v-model="userValue">
        <button type="submit">OK</button>
    </form>
    `
}