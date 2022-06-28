const product = {
    props: ['item'],
    template: `<div>
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <p>{{item.price}}</p>
                    <button @click='$root.$refs.cart.toAddProduct(item)'>To add</button>
                </div>`
}

const products = {
    components: {product},
    data() {
        return {
            catalogUrl: 'products.json',
            products: [],
            filtered: []
        }
    },
    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    },
    methods: {
        filter(value) {
            let rule = new RegExp(value, 'i');
            this.filtered = this.products.filter(item=> rule.test(item.name));
        }
    },
    template: `<div>
                    <product v-for="item of filtered" :item="item" :key='item.id'></product>
                </div>`
}