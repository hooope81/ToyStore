'use strict';

const app = new Vue({
    el: "#app",
    data: {
        products: [],
        cartItems: [],
        filtered: [],
        userValue: '',
        catalogUrl: 'products.json',
        cartUrl: 'cart.json',
        showCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(text => text.json())
                .catch(error => console.log(error))
        },
        toAddProduct(item) {
            let find = this.cartItems.find(el=> item.id === el.id);
            if(find){
                find.quantity++;
            } else {
                let prod = Object.assign({quantity:1}, item);
                this.cartItems.push(prod);
            }
        },
        toRemoveProduct(item) {
            let find = this.cartItems.find(el=> item.id === el.id);
            if(find.quantity>1){
                find.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(find), 1);
            }
        },
        filter() {
            let rule = new RegExp(this.userValue, 'i');
            this.filtered = this.products.filter(item=> rule.test(item.name));
        }
    },
    mounted() {
        this.getJson(this.catalogUrl)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            }),
            this.getJson(this.cartUrl)
                .then(data => {
                    for (let item of data) {
                        this.cartItems.push(item);
                    }
                })
    }
})