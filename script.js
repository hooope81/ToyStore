'use strict';

const app = new Vue({
    el: "#app",
    data: {
        products: [],
        cartItems: [],
        filtered: [],
        userValue: '',
        productsUrl: 'products.json',
        cartUrl: 'cart.json',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(text => text.json())
                .catch(error => console.log(error))
        },
        toAddProduct(item) {
            let find = this.cartItems.find(el => el.id === item.id);
            if(find){
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, item);
                this.cartItems.push(prod);
            }
        },
        toRemoveProduct(item){
            let find = this.cartItems.find(el => el.id === item.id);
            if(find.quantity > 1){
                find.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(find),1);
            }
        },
        filter() {
            let rule = new RegExp(this.userValue, 'i');
            this.filtered = this.products.filter(item=> rule.test(item.name));
        }
    },
    mounted() {
        this.getJson(this.productsUrl)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            }),
        this.getJson(this.cartUrl)
            .then(data => {
                for (let item of data) {
                        this.$data.cartItems.push(item);
                }
            })

    }
})