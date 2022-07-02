const cart_item = {
    props: ['item'],
    template: `
    <div>
        <img :src="item.img" alt="Some img">
        <h4>{{item.name}}</h4>
        <p>Price: {{item.price}}</p>
        <p>Quantity: {{item.quantity}}</p>
        <p>{{item.price*item.quantity}}</p>
        <button @click='$root.$refs.cart.toRemove(item)'>X</button>
    </div>
    `
};

const cart = {
    components: {cart_item},
    data() {
        return {
            cartUrl: 'cart.json',
            cartItems: [],
            showCart: false
        }
    },
    methods: {
        toRemove(item) {
            if(item.quantity > 1){
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
        }
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
            .then(data=> {
                for(let item of data){
                    this.cartItems.push(item);
                }
            })
    },
    template: `
    <div>
        <button @click="showCart=!showCart">Cart</button>
        <div class="cart" v-show="showCart">
            <p v-if='!cartItems.length'>The cart is empty</p>
            <cart_item v-for="item of cartItems" :key="item.id" :item="item"></cart_item>
        </div>
    </div>

    `
}