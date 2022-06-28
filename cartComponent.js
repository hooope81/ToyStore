Vue.component('cart', {
    props: ['cartItems', 'showCart'],
    
    template: `<div class="cart" v-show="showCart">
                    <p v-if="!cartItems.length">The cart is empty</p>
                    <cart-item v-for="item of cartItems" :item="item" :key="item.id"></cart-item>
                </div>`
});

Vue.component('cart-item', {
    props: ['item'],
    template: `<div>
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <p>Price:{{item.price}}</p>
                    <p>Quantity:{{item.quantity}}</p>
                    <p>{{item.quantity*item.price}}</p>
                    <button @click="$root.toRemoveProduct(item)">x</button>
                </div>`
})

const cartItem = {
    props: ['item'],
    template: `<div>
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <p>Price:{{item.price}}</p>
                    <p>Quantity:{{item.quantity}}</p>
                    <p>{{item.quantity*item.price}}</p>
                    <button @click="$root.$refs.cart.toRemoveProduct(item)">x</button>
                </div>`
}

const cart = {
    components: {'cart-item': cartItem},
    data(){
        return {
            cartUrl: 'cart.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
                .then(data => {
                    for (let item of data) {
                        this.cartItems.push(item);
                    }
                })
    },
    methods: {
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
    },
    template: ` <div class="cart__box">
                    <button @click="showCart=!showCart">Cart</button>
                    <div class="cart" v-show="showCart">
                        <p v-if="!cartItems.length">The cart is empty</p>
                        <cart-item v-for="item of cartItems" :item="item" :key="item.id"></cart-item>
                    </div>
                </div>
                `
}