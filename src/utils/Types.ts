import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from '../redux/actions/actionTypes';

export interface IResponseType {
  id: number;
  name: string;
  prices: IPrice[];
}

export interface IPrice {
  id: number;
  price: number;
  date: string;
}
export interface IProduct {
  id: number;
  name: string;
}
export interface IProductPrices {
  productId: number;
  prices: IPrice[];
}
export interface IState {
  products: IProduct[];
  prices: IProductPrices[];
  lastProductId: number;
  lastPriceId: number;
}
export interface IAppState {
  products: IProduct[];
  prices: IProductPrices[];
  lastProductId: number;
  lastPriceId: number;
}

export interface IAddProduct {
  type: typeof ADD_PRODUCT;
  payload: {
    product: IProduct;
    price: IProductPrices;
    lastProductId: number;
    lastPriceId: number;
  };
}

export interface IFetchProduct {
  type: typeof FETCH_PRODUCTS;
  payload: {
    products: IProduct[];
    prices: IProductPrices[];
    lastProductId: number;
    lastPriceId: number;
  };
}

export interface IUpdateProduct {
  type: typeof UPDATE_PRODUCT;
  payload: {
    product: IProduct;
    newPrice: IProductPrices;
    lastPriceId: number;
  };
}

export interface IDeleteProduct {
  type: typeof DELETE_PRODUCT;
  payload: {
    productId: number;
  };
}

export type IAppActions =
  | IFetchProduct
  | IDeleteProduct
  | IUpdateProduct
  | IAddProduct;
