<template>
    <div class="field">
        <PageButton
            v-for="page of pages"
            v-bind:page="page"
            v-bind:currentPage="currentPage"
            @click="changeActivePage"
        />
    </div>
</template>

<script>
    import PageButton from "@/components/UI/buttons/PageButton";
    export default {
        name: "Pagination",
        components: {PageButton},
        props: ['pages', 'currentPage'],
        data() {
            return {
                activePage: this.currentPage
            }
        },
        methods: {
            changeActivePage(pageNum) {
                this.activePage = pageNum;
                this.$emit('selectPage', pageNum);
            }
        }
    }
</script>

<style scoped>
    .field {
        position: absolute;
        width: 100%;
        bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>