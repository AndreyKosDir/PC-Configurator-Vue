<template>
    <div class="close" v-on:click="close"></div>
</template>

<script>
    export default {
        name: "CloseButton",
        methods: {
            close() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>
    .close {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0.5;
    }

    .close:hover {
        opacity: 1;
    }

    .close:before, .close:after {
        position: absolute;
        content: '';
        height: 30px;
        width: 4px;
        background-color: teal;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }


</style>