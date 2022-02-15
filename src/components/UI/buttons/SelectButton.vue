<template>
    <button @click="click">
        {{text}}
    </button>
</template>

<script>
    export default {
        name: "SelectButton",
        props: ['text'],
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    button {
        font-family: Arial Narrow, serif;
        font-weight: bold;
        font-size: 15px;
        color: teal;
        padding: 5px;
        border: solid 2px teal;
        border-radius: 4px;
        background-color: white;
    }

    button:hover {
        cursor: pointer;
        color: white;
        background-color: teal;
    }
</style>