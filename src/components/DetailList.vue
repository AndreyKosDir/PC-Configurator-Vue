<template>
    <div class="list">
        <Detail
            v-for="detail of detailList"
            :detail="detail"
            :itemInfo="itemInfo"
            :itemId="itemId"
            @deleteItem="removeItem"
            @selectDetail="openDetailCatalog"
        />
    </div>
</template>

<script>
    import Detail from "./Detail";
    export default {
        name: "DetailList",
        props: ["detailList", "itemInfo", "itemId"],
        components: {
            Detail
        },
        methods: {
            /**
             * Открыть каталог с выбранной деталью.
             * @param id ID детали.
             * @param name Наименование детали.
             */
            openDetailCatalog(id, name) {
                this.$emit('openCatalog', id, name);
            },

            /**
             * Удалить товар из списка выбранных товаров.
             * @param id ID детали.
             */
            removeItem(id) {
                this.$emit('removeItem', id);
            }
        }
    }
</script>

<style>
    .list {
        width: 825px;
        height: 800px;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: space-between;
        align-content: space-between;
    }
</style>