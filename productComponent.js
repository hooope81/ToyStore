Vue.component('product', {
    props: ['products'],
    template: `<div>
                    <product-item  v-for="item of products" :item="item" :key='item.id'></product-item>
                </div>`
});

Vue.component('product-item', {
    props: ['item'],
    template: `<div>
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <p>{{item.price}}</p>
                    <button @click='$parent.$emit("add-product", item)'>To add</button>
                </div>`
}) 