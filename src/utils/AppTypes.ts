export interface IPrice {
  id: number;
  price: number;
  date: string;
}

export interface IResponseType {
  id: number;
  name: string;
  prices: IPrice[];
}

export interface IProduct {
  id: number;
  name: string;
}

export interface IProductPrices {
  productId: number;
  prices: IPrice[];
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
