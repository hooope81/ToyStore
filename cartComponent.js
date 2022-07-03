const cart_item = {
    props: ['item'],
    template: `<div>
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <p>Price:{{item.price}}</p>
                    <p>Quantity:{{item.quantity}}</p>
                    <p>{{item.quantity*item.price}}</p>
                    <button @click='$root.$refs.cart.toRemoveProduct(item)'>x</button>
                </div>`
}

const cart = {
    data(){
        return {
            cartUrl: 'cart.json',
            cartItems: [],
            showCart: false
        }
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
            if(item.quantity>1){
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
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
    components: {cart_item},
    template: ` <div class="cart__box">
                    <button @click="showCart=!showCart" class="cart__btn">
                        <div class="cart__inner">
                            <p>Cart</p>
                            <img src="img/cart.png" alt="cart"> 
                            <div class="cart__quantity">0</div>
                         </div>
                    </button>
                    <div class="cart" v-show="showCart">
                        <p v-if="!cartItems.length">The cart is empty</p>
                        <cart_item v-for="item of cartItems" :item="item" :key="item.id"></cart_item>
                    </div>
                </div>
                `

}