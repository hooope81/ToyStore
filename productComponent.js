 Vue.component('product', {
    props: ['filtered'],
    template: `<div class="products">
                    <product-item :item='item' v-for="item of filtered" :key="item.id"></product-item>
                </div>`
 });

 Vue.component('product-item', {
    props: ['item'],
    template: `<div class="card">
                    <img :src="item.img" alt="Some img">
                    <h3>{{item.name}}</h3>
                    <p>{{item.price}}</p>
                    <button @click="$parent.$emit('add-product', item)">To add</button>
                </div>`
 })