import {ICatalogItem, IDetail, IItemsList, IOptions, TLastSort, TSort} from "@/interfaces/Interfaces";

interface IItemDataConfig {
    [id: string]: string
}

interface IItemsData {
    [id: string]: ICatalogItem[]
}

const ItemsDataConfig: IItemDataConfig = {
    case: './data/Items/case.json',
    cpu: './data/Items/cpu.json',
    fan: './data/Items/fan.json',
    hardDisk: './data/Items/hardDisk.json',
    motherBoard: './data/Items/motherBoard.json',
    powerBank: './data/Items/powerBank.json',
    ramMemory: './data/Items/ramMemory.json',
    ssd: './data/Items/ssd.json',
    videoCard: './data/Items/videoCard.json'
}

/**
 * Класс для имитации работы бэкенда.
 */
export default class BackEnd {

    private static itemsData: IItemsData = {};

    private static detailsData: IDetail[] = [];

    /**
     * Получить данные по деталям.
     */
    static getDetailsData(): IDetail[] {
        return this.detailsData;
    }

    /**
     * Загрузить все данные.
     */
    static async loadData() {
        await Promise.all([this.loadDetailsData(), this.loadItemsData()]);
    }

    /**
     * Получить данные из json файла.
     * @param {string} path Путь до файла.
     */
    static async getData<T>(path: string): Promise<T> {
        const request: Response = await fetch(path);
        return request.json();
    }

    /**
     * Загрузить данные деталей.
     */
    static async loadDetailsData(): Promise<void> {
        const path: string = './data/PcModules/pcModules.json';
        this.detailsData = await BackEnd.getData<IDetail[]>(path);
    }

    /**
     * Загрузить данные всех товаров.
     */
    static async loadItemsData(): Promise<void> {
        let detailsList: ICatalogItem[]  = [];
        let currentDetail: string = '';

        for (const detail in ItemsDataConfig) {

            if (ItemsDataConfig.hasOwnProperty(detail)) {
                currentDetail = detail;
                detailsList = await this.getData(ItemsDataConfig[detail]);
                BackEnd.itemsData[currentDetail] = detailsList;
            }
        }
    }

    /**
     * Получить объкт содержащий список товаров и список страниц, соответствующих переданным опциям.
     * @param {IOptions} options Опции для получения списков.
     */
    static getItemsAndPages(options: IOptions): Promise<IItemsList> {
        const result: IItemsList = {
            items: [],
            pages: [],
        };

        const allItemsData: IItemsData = this.itemsData;

        // Получить список товаров по id из данных.
        let items: ICatalogItem[] = allItemsData[options.id];

        // Выполнить поиск товаров, удволетворяющих поисковому запросу.
        items = this.findItems(items, options.searchQuery);

        const sort = options.sort;

        // Выполнить сортировку списка по заданному параметру (если требуется);
        if (sort.lastSort) {
            this.sortItems(items, sort.lastSort, options.sort[sort.lastSort]);
        }

        // Получить список товаров разбитый постранично.
        const paginatedItems = this.getSplitArray<ICatalogItem>(items, options.elCount);

        // Получить список страниц постраничного списка товаров.
        result.pages = paginatedItems.length > 1 ? this.getPagesArray(paginatedItems.length): [];

        // Получить список товаров с текущей страницы.
        result.items = paginatedItems[options.currentPage - 1] || [];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(result);
            }, this.generateTimeOut(0, 700));
        });
    }

    /**
     * Сгенерировать случайное число в заданном диапазоне (включительно).
     * @param {number} min Минимальное значение.
     * @param {number} max Максимальное значение.
     */
    static generateTimeOut(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Сортировка списка товаров.
     * @param {ICatalogItem[]} list Список товаров.
     * @param {Partial<TLastSort>} sortParam Параметр сортировки.
     * @param {TSort} sortingDirection Сортировка по возрастанию/убыванию.
     */
    static sortItems(list: ICatalogItem[], sortParam: Partial<TLastSort>, sortingDirection: TSort): void {
        if (sortingDirection === '') {
            return;
        }

        list.sort((a: ICatalogItem, b: ICatalogItem): number => {
            let result: number = 1;

            if (sortingDirection === 'descending') result = -1;

            if (a[sortParam] < b[sortParam]) {
                return -result;
            }
            if (a[sortParam] > b[sortParam]) {
                return result;
            }
            return 0;
        });
    }

    /**
     * Поиск в списке товаров удволетворяющих поисковому запросу.
     * @param {ICatalogItem[]} list Список товаров.
     * @param {string} searchQuery Поисковый запрос.
     */
    static findItems(list: ICatalogItem[], searchQuery: string): ICatalogItem[] {

        return list.filter((item: ICatalogItem) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }

    /**
     * Получить список элементов разбитый с определенным шагом.
     * @param array Массив элементов.
     * @param {name} interval Шаг разбиения массива.
     */
    static getSplitArray<T>(array: Array<T>, interval: number): Array<T>[] {
        const result: Array<Array<T>> = [];
        let current: Array<T> = [];

        for (let i = 0; i < array.length; i++) {

            if (i % interval === 0 && i !== 0) {
                result.push(current);
                current = [];
            }

            current.push(array[i]);
        }

        if (current.length !== 0) {
            result.push(current);
        }

        return result;
    }

    /**
     * Получить массив страниц.
     * @param {number} pages Количество страниц.
     */
    static getPagesArray(pages: number): number[] {
        let result: number[] = [];
        for (let i = 0; i < pages; i++) {
            result.push(i + 1);
        }

        return result;
    }
}