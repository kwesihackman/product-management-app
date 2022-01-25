import {
  IAddProduct,
  IDeleteProduct,
  IFetchProduct,
  IProduct,
  IProductPrices,
  IState,
  IUpdateProduct,
} from '../../utils/Types';
import * as actionTypes from './actionTypes';

export const FetchProducts = (data: IState): IFetchProduct => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
    payload: {
      products: data.products,
      prices: data.prices,
      lastPriceId: data.lastPriceId,
      lastProductId: data.lastProductId,
    },
  };
};

export const DeleteProduct = (productId: number): IDeleteProduct => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: {
      productId,
    },
  };
};

export const UpdateProduct = (
  product: IProduct,
  newPrice: IProductPrices,
  lastPriceId: number
): IUpdateProduct => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: {
      product,
      newPrice,
      lastPriceId,
    },
  };
};

export const AddProduct = (
  product: IProduct,
  price: IProductPrices,
  lastProductId: number,
  lastPriceId: number
): IAddProduct => {
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: {
      product,
      price,
      lastPriceId,
      lastProductId,
    },
  };
};
