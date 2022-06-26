Vue.component('filter-item', {

    template: ` <form action="#" @submit.prevent="$root.filter()">
                    <input type="text" v-model="$root.userValue">
                    <button type="submit">ok</button>
                </form>`
})