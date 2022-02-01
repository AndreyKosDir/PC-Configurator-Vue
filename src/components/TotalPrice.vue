<template>
    <div class="field" :class="{active: price > 0}">
            <pre>Итого:  {{strPrice}}   ₽</pre>
    </div>
</template>

<script>
    export default {
        name: "TotalPrice",
        props: ["price"],
        computed: {
            strPrice: function () {
                return this.price.toLocaleString();
            }
        }
    }
</script>

<style scoped>
    .field {
        width: 700px;
        height: 100px;
        display: flex;
        align-items: end;
        justify-content: center;
        font-size: 40px;
    }

    .active {
        color: teal;
        font-size: 45px;
        font-weight: bold;
    }

    .active pre {
        text-shadow: 2px 1px black;
    }

    pre {
        font-family: Arial Narrow, serif;
    }
</style>