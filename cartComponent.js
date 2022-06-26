Vue.component('cart', {
    props: ['cartItems', 'showCart'],

    template: `<div class="cart"  v-show="showCart">
                    <p v-if="!cartItems.length">The cart is empty</p>
                    <cart-item v-for="item of         cartItems" :key="item.id" :item="item"></cart-item>
                </div>`
});

Vue.component('cart-item', {
    props: ['item'],

    template: `<div class="cart__item">
                    <img :src="item.img" alt="Some img">
                    <div class="cart__left">
                        <h3>{{item.name}}</h3>
                        <p>Quantity: {{item.quantity}}</p>
                        <p>Price: {{item.price}}</p>
                    </div>
                    <div class="cart__right">
                        <p>{{item.price*item.quantity}}</p>
                        <button @click="$root.toRemoveProduct(item)">X</button>
                    </div>
              </div>`
})