<template>
    <div class="item-field">
        <img :src="item.img" alt="">
        <div class="info">
            <p class="head">{{item.name}}</p>
            <p>{{item.info}}</p>
        </div>
        <div class="price">
            <p><strong>{{item.price.toLocaleString()}}</strong> ₽</p>
        </div>
        <div class="select">
            <SelectButton v-bind:text="'Выбрать'" @click="select"/>
        </div>
    </div>
</template>

<script>
    import SelectButton from "@/components/UI/buttons/SelectButton";
    export default {
        name: "CatalogItem",
        components: {SelectButton},
        props: ['item'],
        methods: {
            /**
             * Выбрать товар.
             */
            select() {
                this.$emit('selectItem', this.item)
            }
        }
    }
</script>

<style scoped>
    .item-field {
        width: 800px;
        height: 120px;
        background-color: white;
        display: flex;
        margin-bottom: 10px;
        box-shadow: 0 0 3px 1px gray;
        overflow: hidden;
        border-radius: 10px;
    }

    .item-field:hover {
        box-shadow: 0 0 3px 1px teal;
        transform: scale(1.005);
    }

    .item-field:hover .price {
        color: teal;
    }

    img {
        width: 120px;
        height: 120px;
        -webkit-user-drag: none;
        object-fit: contain;
    }

    .wrapper__detail div {
        overflow: hidden;
    }

    .info {
        width: 490px;
        height: 120px;
    }

    .info p {
        padding-left: 10px;
    }

    .info p.head {
        padding-top: 5px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .price {
        width: 100px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
    }

    .select {
        width: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>