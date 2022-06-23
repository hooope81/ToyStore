'use strict';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'products.json',
        cartUrl: 'cart.json',
        products: [],
        cartItems: [],
        filtered: [],
        show: false, 
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(text => text.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            let find = this.cartItems.find(el => el.id === item.id);
            if (find) {
                find.quantity++;
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.cartItems.push(prod);
            }
        },
        removeProduct(item){
            if(item.quantity>1){
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
        },
        filter() {
            let rule = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el=> rule.test(el.name));
            
        }
    },
    mounted() {
        this.getJson(this.catalogUrl)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(this.cartUrl)
            .then(data => {
                for (let item of data) {
                    this.$data.cartItems.push(item);
                }
            })
    }

})