import React from 'react';
import { getCurrentPrice } from '../../utils/Functions';
import { IProduct, IProductPrices } from '../../utils/Types';

type Props = {
  product: IProduct;
  prices: IProductPrices[];
  index: number;
};

export type Inputs = {
  productName: string;
  productPrice: number;
};

const ProductListItem = ({ product, index, prices }: Props) => {
  const currentProductPrices = prices.find(
    (priceList) => priceList.productId === product.id
  );
  const currentProductPrice = getCurrentPrice(
    currentProductPrices!.prices
  ).price;

  return (
    <React.Fragment>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{currentProductPrice.toFixed(2)}</td>
        <td className="cursor-pointer">View</td>
        <td className="cursor-pointer">Edit</td>
        <td className="text-danger cursor-pointer">Delete</td>
      </tr>
    </React.Fragment>
  );
};

export default ProductListItem;
