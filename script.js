'use strict';

const app = new Vue({
    el: "#app",
    methods: {
        getJson(url) {
            return fetch(url)
                .then(text => text.json())
                .catch(error => console.log(error))
        }
    },
    components: {products, cart, filter_el}
})