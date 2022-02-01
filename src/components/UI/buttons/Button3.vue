<template>
    <button
        class="notActive"
        v-bind:class="{active: page === currentPage}"
        @click="selectPage"
    >
        {{page}}
    </button>
</template>

<script>
    export default {
        name: "Button3",
        props: ['page', 'currentPage'],
        methods: {
            selectPage() {
                this.$emit('click', this.page)
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 0 5px 0 5px;
        width: 28px;
        height: 28px;
        font-size: 20px;
        font-weight: bold;
        border: none;
        border-radius: 4px;
    }

    .notActive {
        color: teal;
        background: none;
    }

    .notActive:hover {
        cursor: pointer;
        background-color: white;
        border: 2px solid teal;
    }

    .active, .active:hover {
        color: white;
        background-color: teal;
        cursor: default;
    }
</style>