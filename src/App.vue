<template>
  <div id="wrapper">
    <span id="title">Конфигуратор ПК</span>
    <div id="app">
      <div id="box">
        <DetailViewList
                :detailList="detailList"
                :itemsChange="selectedItemsChange"
                :selectedItems.sync="selectedItems"
        />
        <TotalPrice :price="totalPrice"/>
      </div>
      <DetailList
              :detailList="detailList"
              :itemId="itemId"
              :itemInfo="currentSelectedItem"
              @openCatalog="openCatalog"
              @removeItem="removeItem"
      />
      <Catalog
              :id="detailId"
              :name="itemName"
              @closeCatalog="showCatalog"
              @getItemInfo="getItemFromCatalog"
              v-if="catalogView">
      </Catalog>
    </div>

  </div>

</template>

<script>
  import DetailViewList from "@/components/DetailViewList.vue";
  import BackEnd from "./BackEnd";
  import TotalPrice from "@/components/TotalPrice.vue";
  import DetailList from "@/components/DetailList.vue";
  import Catalog from "@/components/Catalog.vue";
  import CloseButton from "@/components/UI/buttons/CloseButton.vue";

  export default {
    name: 'App',
    data() {
      return {
        detailList: BackEnd.getDetailsData(),
        options: {},
        catalogView: false,
        totalPrice: 0,
        detailId: '',
        itemId: '',
        selectedItemsChange: false,
        itemName: '',
        currentSelectedItem: {},
        selectedItems: {}
      }
    },

    methods: {
      /**
       * Получить выбранный товар из каталога.
       * @param item Товар.
       */
      getItemFromCatalog(item) {
        this.currentSelectedItem = item;
        this.itemId = this.detailId;
        this.addItem(item);
      },

      /**
       * Показать/скрыть каталог.
       */
      showCatalog() {
        this.catalogView = !this.catalogView;
      },

      /**
       * Открыть каталог.
       * @param id ID выбранной детали.
       * @param name Название выбранной детали.
       */
      openCatalog(id, name) {
        this.detailId = id;
        this.itemName = name;
        this.showCatalog();
      },

      /**
       * Добавить товар в список выбранных товаров.
       * @param item Товар.
       */
      addItem(item) {
        const itemId = this.itemId;
        this.selectedItems[itemId] = item;
        this.totalPriceCalculate(this.selectedItems[itemId].price);
        this.selectedItemsChange = !this.selectedItemsChange;
      },

      /**
       * Удалить товар из списка выбранных товаров.
       * @param itemId ID товара.
       */
      removeItem(itemId) {
        this.totalPriceCalculate(-this.selectedItems[itemId].price);
        this.itemId = '';
        delete this.selectedItems[itemId];
        this.selectedItemsChange = !this.selectedItemsChange;
      },

      /**
       * Рассчитать итоговую стоимость.
       * @param price Стоимость товара.
       */
      totalPriceCalculate(price) {
        this.totalPrice = Math.round(this.totalPrice + price);
      }
    },

    components: {
      CloseButton,
      Catalog,
      DetailList,
      TotalPrice,
      DetailViewList

    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    overflow: hidden;
  }

  #wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    font-family: Arial Narrow, serif;
  }

  #title {
    margin: 15px 0 30px 0;
    font-size: 40px;

  }

  #app {
    display: flex;
    justify-content: center;
    align-items: start;
  }

  #box {
    font-family: Arial Narrow, serif;
    margin-right: 80px;
  }
</style>
