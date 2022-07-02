const product_item = {
    props: ['item'],
    template: `
    <div>
        <img :src="item.img" alt="Some img">
        <h4>{{item.name}}</h4>
        <p>{{item.price}}</p>
        <button @click='$root.$refs.product.toAddProduct(item)'>To add</button>
    </div>
    `
};


const product = {
    components: {product_item},
    data() {
        return {
            productUrl: 'products.json',
            products: [],
            filtered: [],
            
        }
    },
    methods: {
        toAddProduct(item) {
            
            let find = this.$root.$refs.cart.cartItems.find(el=> el.id === item.id);
            if(find){
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, item);
                this.$root.$refs.cart.cartItems.push(prod);
            }
        }, 
        filter(userValue) {
            let rule = new RegExp(userValue, 'i');
            this.filtered = this.products.filter(item=> rule.test(item.name));
        }
    },
    mounted() {
        this.$parent.getJson(this.productUrl)
            .then(data=> {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                    
                }
            })
    },
    template: `
    <div>
        <product_item v-for="item of filtered" :key="item.id" :item="item"></product_item>
    </div>
    `
}