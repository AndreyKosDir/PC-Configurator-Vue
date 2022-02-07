export type TSort = '' | 'ascending' | 'descending';
export type TLastSort = 'name' | 'price';

export interface IDetail {
    id: string;
    name: string;
    path: string;
    status: string;
    format: string;
}

export interface ICatalogItem {
    name: string
    price: number,
    info: string,
    img: string
}

export interface IOptions {
    id: string;
    elCount: number;
    searchQuery: string;
    sort: {
        lastSort?: TLastSort;
        name: TSort;
        price: TSort;
    };
    currentPage: number;
}

export interface IItemsList {
    items: ICatalogItem[];
    pages: number[];
}