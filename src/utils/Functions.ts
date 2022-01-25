import { IPrice, IProduct, IProductPrices, IResponseType } from './Types';

export const extractAllPrices = (items: IResponseType[]): IProductPrices[] => {
  const priceList = items.map((product) => ({
    productId: product.id,
    prices: product.prices,
  }));
  return priceList;
};

export const extractAllProducts = (items: IResponseType[]): IProduct[] => {
  return items.map((product) => ({ id: product.id, name: product.name }));
};

export const getCurrentPrice = (items: IPrice[]): IPrice => {
  const sortedPrices = items.sort((previous, current) => {
    const prevDate: Date = new Date(previous.date);
    const currentDate: Date = new Date(current.date);
    return +currentDate - +prevDate;
  });
  return sortedPrices[0];
};

export const sortPricesByDate = (items: IPrice[] | undefined): IPrice[] => {
  if (items === undefined) return [];
  const sortedPrices = items.sort((previous, current) => {
    const prevDate: Date = new Date(previous.date);
    const currentDate: Date = new Date(current.date);
    return +currentDate - +prevDate;
  });
  return sortedPrices;
};
