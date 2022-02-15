<template>
    <div class="wrapper-catalog">
        <div class="catalog">
            <span class="title">{{name}}</span>
            <CloseButton class="close" @click="closeCatalog"/>
            <Input @changeSearchQuery="changeSearchQuery"/>
            <Loader v-if="isLoading"/>
            <div class="sort">
                <NavigationButton @click="sort" :info="{text: 'Наименование', id: 'name'}" :direct="sortByName"/>
                <NavigationButton @click="sort" :info="{text: 'Цена', id: 'price'}" :direct="sortByPrice"/>
            </div>
            <CatalogItem v-for="item of items" :item="item" @selectItem="returnItem"/>
            <div class="dummy" v-if="itemsIsEmpty() && !isLoading">По данному запросу ничего не найдено</div>
            <Pagination :currentPage="currentPage" :pages="pages" @selectPage="changePage"/>
        </div>
    </div>
</template>

<script>
    import Input from "./UI/Input";
    import CloseButton from "./UI/buttons/CloseButton";
    import Loader from "@/components/UI/Loader";
    import CatalogItem from "@/components/CatalogItem";
    import Pagination from "@/components/UI/Pagination";
    import NavigationButton from "@/components/UI/buttons/SortButton";
    import BackEnd from "@/BackEnd";

    export default {
        name: "Catalog",
        components: {NavigationButton, Pagination, CatalogItem, Loader, CloseButton, Input},
        props: ['id', 'name'],
        data() {
            return {
                searchQuery: '',
                sortByName: '',
                sortByPrice: '',
                lastSort: undefined,
                currentPage: 1,
                pages: [],
                items: [],
                isLoading: true,
            }
        },

        computed: {
            /**
             * Опции для отправки запроса на "бэкенд".
             */
            itemsOptions: function() {
                return {
                    id: this.id,
                    elCount: 6,
                    searchQuery: this.searchQuery,
                    sort: {
                        lastSort: this.lastSort,
                        name: this.sortByName,
                        price: this.sortByPrice
                    },
                    currentPage: this.currentPage
                }
            }
        },

        methods: {
            /**
             * Закрыть каталог.
             */
            closeCatalog() {
               this.$emit('closeCatalog');
            },

            /**
             * Получить данные (список товаров и список страниц).
             */
            getData() {
                this.isLoading = true;
                BackEnd.getItemsAndPages(this.itemsOptions)
                    .then(resolve => {
                        this.items = resolve.items;
                        this.pages = resolve.pages;
                    })
                    .then(() => {
                        this.isLoading = false;
                    })
            },

            /**
             * Проверка на пустой каталог.
             */
            itemsIsEmpty() {
                return this.items.length === 0;
            },

            /**
             * Изменить значение данных поисковой строки.
             * @param text Поисковый запрос.
             */
            changeSearchQuery(text) {
                this.currentPage = 1;
                this.searchQuery = text;
            },

            /**
             * Сортировка.
             * @param id Критерий сортировки (name/price).
             * @param param Порядок сортировки (none/ascending/descending).
             */
            sort(id, param) {
                this.lastSort = id;
                this.currentPage = 1;

                if (id === 'name') {
                    this.sortByName = param;
                    this.sortByPrice = '';
                }

                if (id === 'price') {
                    this.sortByPrice = param;
                    this.sortByName = '';
                }
            },

            /**
             * Сменить страницу каталога.
             * @param pageNum Страница.
             */
            changePage(pageNum) {
                this.currentPage = pageNum;
            },

            /**
             * Вернуть информацию о выбранном товаре на главную страницу.
             * @param itemInfo Информация о выбранном товаре.
             */
            returnItem(itemInfo) {
                this.$emit('getItemInfo', itemInfo);
                this.closeCatalog();
            }
        },

        watch: {
            itemsOptions() {
                this.getData();
            }
        },

        created() {
            this.getData();
        }
    }
</script>

<style scoped>
    .wrapper-catalog {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(190, 210, 209, 0.5);
        display: flex;
        justify-content: center;
        background-attachment: scroll;
        overflow: auto;
    }

    .catalog {
        width: 820px;
        height: 920px;
        position: absolute;
        margin-top: 18px;
        border-radius: 15px;
        box-shadow: 0 0 3px 1px teal;
        background-color: #e3ffff;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .title {
        margin: 10px 0 10px 0;
        font-size: 22px;
    }

    .sort {
        width: 800px;
        display: flex;
        justify-content: space-between;
        margin: 5px 0 5px 0;
    }

    .sort span:nth-child(1) {
        margin-left: 130px;
    }

    .sort span:nth-child(2) {
        margin-right: 125px;
    }

    .close {
        position: absolute;
        top: 4px;
        right: 4px;
    }

    .dummy {
        width: 800px;
        height: 120px;
        background-color: white;
        display: flex;
        box-shadow: 0 0 3px 1px gray;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        align-items: center;
        justify-content: center;
    }
</style>