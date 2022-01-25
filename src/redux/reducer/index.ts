import { IAppActions, IAppState } from '../../utils/Types';
import * as actionsTypes from '../actions/actionTypes';

const initialState: IAppState = {
  products: [],
  prices: [],
  lastPriceId: 1,
  lastProductId: 1,
};

export const reducer = (state = initialState, action: IAppActions) => {
  switch (action.type) {
    case actionsTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        prices: action.payload.prices,
        lastProductId: action.payload.lastProductId,
        lastPriceId: action.payload.lastPriceId,
      };
    case actionsTypes.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload.product),
        prices: state.prices.concat(action.payload.price),
        lastProductId: action.payload.lastProductId,
        lastPriceId: action.payload.lastPriceId,
      };
    case actionsTypes.DELETE_PRODUCT:
      const allProducts = [...state.products];
      allProducts.splice(action.payload.productId, 1);
      return {
        ...state,
        products: allProducts,
      };
    case actionsTypes.UPDATE_PRODUCT:
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.product.id) {
          return action.payload.product;
        }
        return product;
      });
      const updatedPrices = state.prices.map((price) => {
        if (price.productId === action.payload.newPrice.productId) {
          return action.payload.newPrice;
        }
        return price;
      });

      return {
        ...state,
        products: updatedProducts,
        prices: updatedPrices,
        lastPriceId: action.payload.lastPriceId,
      };

    default:
      return state;
  }
};
