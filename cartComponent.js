const cart_item = {
    props: ['item'],
    template: `<div class="cart__card">
                    <img :src="item.img" alt="Some img">
                    <div class="cart__right">
                    <h4>{{item.name}}</h4>
                    <p>Price:$ {{item.price}}</p>
                    <p>Quantity:{{item.quantity}}</p>
                    </div>
                    <div class="cart__left">
                    <p>$ {{item.quantity*item.price}}</p>
                    <button @click='$root.$refs.cart.toRemoveProduct(item)'>X</button>
                    </div>
                </div>`
}

const cart = {
    data() {
        return {
            cartUrl: 'cart.json',
            cartItems: [],
            showCart: false,
            count: 0
        }
    },
    methods: {
        toAddProduct(item) {
            let find = this.cartItems.find(el => item.id === el.id);
            if (find) {
                localStorage.removeItem(`${item.id}`);
                find.quantity++;
                let obj = JSON.stringify(find);
                localStorage.setItem(`${item.id}`, obj);
            } else {
                let obj = JSON.stringify(Object.assign({ quantity: 1 }, item));
                localStorage.setItem(`${item.id}`, obj);
            }
            this.toUpdateCart();
        },
        toRemoveProduct(item) {
            if (item.quantity > 1) {
                localStorage.removeItem(`${item.id}`);
                item.quantity--;
                let obj = JSON.stringify(item);
                localStorage.setItem(`${item.id}`, obj);
            } else {
                localStorage.removeItem(`${item.id}`);
            }
            this.toUpdateCart();
        },
        toUpdateCart() {
            this.cartItems = [];
            for (let i = 0; i < localStorage.length; i++) {
                this.cartItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }

    },
    mounted() {
        this.toUpdateCart();

    },
    components: { cart_item },
    template: ` <div class="cart__box">
                    <button @click="showCart=!showCart" class="cart__btn">
                        <div class="cart__inner">
                            <p>Cart</p>
                            <img src="img/cart.png" alt="cart"> 
                            <div class="cart__quantity">{{count}}</div>
                        </div>
                    </button>
                    <div class="cart" v-show="showCart">
                        <p v-if="!cartItems.length">The cart is empty</p>
                        <cart_item v-for="item of cartItems" :item="item" :key="item.id"></cart_item>
                    </div>
                </div>
                `

}