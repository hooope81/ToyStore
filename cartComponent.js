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