<template>
    <div class="detail" :class="{active: active}">
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
    export default {
        props: ['detail', 'items', 'itemsChange'],
        data() {
            return {
                imgSrc: '',
                active: false
            }
        },
        methods: {
            /**
             * Установить src для изображения.
             */
            setImgSrc() {
                this.imgSrc = `${this.detail.path}/${this.detail.status}/${this.detail.id}.${this.detail.format}`;
            }
        },

        watch: {
            itemsChange() {
                this.active = !!this.items[this.detail.id];
            }
        },

        beforeMount() {
            this.setImgSrc();
        }
    }
</script>

<style scoped>
    .detail {
        width: 180px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
    }

    .active {
        background-color: rgba(0, 128, 128, 0.4);
        border-radius: 50%;
        box-shadow: 0 0 60px teal;
    }

    .detail span {
        font-size: 25px;
    }

    .detail img {
        width: 180px;
        height: 180px;
        -webkit-user-drag: none;
        object-fit: contain;
    }
</style>