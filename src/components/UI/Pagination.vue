<template>
    <div class="field">
        <Button3
            v-for="page of pages"
            v-bind:page="page"
            v-bind:currentPage="currentPage"
            @click="changeActivePage"
        />
    </div>
</template>

<script>
    import Button3 from "@/components/UI/buttons/Button3";
    export default {
        name: "Pagination",
        components: {Button3},
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