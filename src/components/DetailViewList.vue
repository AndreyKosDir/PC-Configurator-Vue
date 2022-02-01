<template>
    <div class="detailViewList">
        <DetailView
                v-for="detail of detailList"
                :detail="detail"
                :items="selectedItems"
                :itemsChange="itemsChange"
        />
    </div>
</template>

<script>
    import DetailView from '@/components/DetailView'
    export default {
        name: 'detailViewList',
        props: ['detailList', 'selectedItems', 'itemsChange'],
        components: {
            DetailView
        }
    }
</script>

<style>
    .detailViewList {
        margin-top: 35px;
        width: 700px;
        height: 665px;
        display: grid;
        grid-template-columns: repeat(3, auto);
        justify-content: space-between;
        align-content: space-between;
    }
</style>