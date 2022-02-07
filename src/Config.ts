import {ICatalogItem, IDetail, IOptions} from "@/interfaces/Interfaces";

export interface IConfig {
    details: IDetail[],
    items: {
        [id: string]: ICatalogItem;
    },
    item: ICatalogItem,
    options: IOptions
}

export const Config: IConfig = {
    details: [],
    items: {},
    item: {
        name: '',
        price: 0,
        info: '',
        img: ''
    },
    options: {
        id: 'videoCard',
        elCount: 6,
        searchQuery: 'palit',
        sort: {
            lastSort: 'price',
            name: 'ascending',
            price: 'ascending',
        },
        currentPage: 1,
    }
}