<template>
    <form @submit.prevent="onSubmit" class="form">
        <input type="text" placeholder="Поиск..." v-model="searchQuery">
        <Button1 v-bind:text="'Найти'"></Button1>
    </form>
</template>

<script>
    import Button1 from "./buttons/Button1";
    export default {
        name: "Input",
        components: {Button1},
        data() {
          return {
              searchQuery: ''
          }
        },
        methods: {
            onSubmit() {
                this.$emit('changeSearchQuery', this.searchQuery);
            }
        }
    }
</script>

<style scoped>
    .form {
        align-self: start;
        margin-left: 10px;
        width: 610px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    input {
        font-size: 15px;
        width: 540px;
        height: 29px;
        border-radius: 4px;
        padding-left: 5px;
        box-shadow: 0 0 3px 1px gray;
        border: none;
        outline: none;
    }

    input:focus {
        box-shadow: 0 0 3px 1px teal;
    }
</style>