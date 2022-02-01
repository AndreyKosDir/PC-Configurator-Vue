<template>
    <div class="wrapper__detail">
        <span class="head">{{detail.name}}</span>
        <div class="notActive" v-if="!isActive" @click="selectDetail">
            <div class="cross"></div>
        </div>
        <div class="active" v-if="isActive">
            <div class="name"><span>{{item.name}}</span></div>
            <img class="img" :src="item.img" alt="">
            <div class="price"><span>{{item.price.toLocaleString()}} ₽</span></div>
            <CloseButton @click="deleteItem"/>
        </div>
    </div>
</template>

<script>
    import CloseButton from "@/components/UI/buttons/CloseButton";
    export default {
        name: "Detail",
        components: {CloseButton},
        props: ["detail", "itemId", "itemInfo"],
        data() {
            return {
                isActive: false,
                item: this.getItemDefault(),
                activeItemId: '',
            }
        },
        methods: {
            changeStatus() {
                this.isActive = !this.isActive;
            },

            /**
             * Выбор детали.
             */
            selectDetail() {
                this.$emit('selectDetail', this.detail.id, this.detail.name);
            },

            /**
             * Проверка совпадения id поля детали с id выбранного товара из каталога.
             * @returns {boolean}
             */
            equalId() {
                return this.itemId === this.detail.id;
            },

            /**
             * Удалить товар.
             */
            deleteItem() {
                this.$emit('deleteItem', this.activeItemId);
                this.changeStatus();
                this.activeItemId = '';
            },

            getItemDefault() {
                return {
                    name: '',
                    price: 0,
                    img: ''
                }
            }
        },

        watch: {
            itemId() {
                if (this.equalId()) {
                    this.changeStatus();
                    this.item = {
                        name: this.itemInfo.name,
                        price: this.itemInfo.price,
                        img: this.itemInfo.img,
                    };
                    this.activeItemId = this.itemId;
                }
            },
        }
    }
</script>

<style scoped>
    .wrapper__detail {
        width: 400px;
        height: 140px;
        display: flex;
        flex-direction: column;
        font-size: 20px;
    }

    .head {
        height: 30px;
        display: flex;
        align-self: start;
        font-size: 25px;
        padding-left: 20px;
    }

    .active, .notActive {
        width: 400px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 5px;
    }

    .notActive {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: gray;
        box-shadow: 0 0 3px 1px gray;
        cursor: pointer;
        transition: transform 0.5s;
    }

    .notActive:hover {
        box-shadow: 0 0 3px 1px teal;
        transform: scale(1.01);
    }

    .cross {
        opacity: 0.5;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.5s;
    }

    .cross:before, .cross:after {
        position: absolute;
        content: '';
        height: 30px;
        width: 4px;
        background-color: gray;
        transition: transform 0.5s;
    }

    .cross:after {
        transform: rotate(90deg);
    }

    .notActive:hover .cross {
        box-shadow: 0 0 3px 2px teal;
        transform: scale(1.25);
    }

    .notActive:hover .cross:before, .notActive:hover .cross:after {
        background-color: teal;
    }

    .notActive:hover .cross:after {
        background-color: teal;
    }

    .active {
        display: grid;
        grid-template:
                "img name close"
                "img price price";
        box-shadow: 0 0 5px 2px teal;
        font-size: 18px;
    }

    .active .name, .active .price {
        display: flex;
        justify-content: center;
        height: 50px;
        font-weight: bold;
    }

    .img {
        grid-area: img;
        width: 100px;
        height: 100px;
        margin-left: 5px;
        -webkit-user-drag: none;
        object-fit: contain;
    }

    .name {
        grid-area: name;
        width: 265px;
        align-items: start;
    }

    .name span {
        margin: 5px 5px 0 5px;
        text-align: center;
    }

    .price {
        grid-area: price;
        width: 295px;
        color: teal;
        align-items: center;
        font-size: 20px;
    }

    .price span {
        transition: font-size 0.5s;
    }

    .active:hover .price span {
        text-shadow: 1px 1px black;;
        font-size: 22px;
    }

</style>