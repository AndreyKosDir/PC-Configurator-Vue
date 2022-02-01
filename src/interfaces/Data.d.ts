import {ICatalogItem, TLastSort, TSort} from "@/Interfaces";

export interface IData {
    /**
     * Сортировка списка элементов.
     * @param list Список элементов.
     * @param sortParam Параметр сортировки.
     * @param sortingDirection Сортировка по возрастанию/убыванию.
     */
    sortItems(list: ICatalogItem[], sortParam: TLastSort, sortingDirection: TSort): void;

    /**
     * Поиск в массиве элементов удволетворяющих поисковому запросу.
     * @param {ICatalogItem[]} list Список элементов.
     * @param {string} searchQuery Поисковый запрос.
     */
    findItems(list: ICatalogItem[], searchQuery: string): ICatalogItem[];

    /**
     * Получить массив элементов разбитый с определенным шагом.
     * @param array Массив элементов.
     * @param {name} interval Шаг разбиения массива.
     */
    getSplitArray<T>(array: Array<T>, interval: number): Array<T>[];

    /**
     * Получить массив страниц.
     * @param pages Количество страниц.
     */
    getPagesArray(pages: number): number[];
}