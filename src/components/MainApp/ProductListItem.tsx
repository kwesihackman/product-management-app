import React, { useState } from 'react';
import { getCurrentPrice } from '../../utils/Functions';
import * as action from '../../redux/actions/actions';
import { IProduct, IProductPrices } from '../../utils/Types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const currentProductPrices = prices.find(
    (priceList) => priceList.productId === product.id
  );
  const currentProductPrice = getCurrentPrice(
    currentProductPrices!.prices
  ).price;

  const handleDeleteProduct = () => {
    console.log(product);
    dispatch(action.DeleteProduct(index));
  };

  return (
    <React.Fragment>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{currentProductPrice.toFixed(2)}</td>
        <td className="cursor-pointer">View</td>
        <td className="cursor-pointer">Edit</td>
        <td
          role="button"
          className="text-danger cursor-pointer"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete
        </td>
      </tr>

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Delete ${product.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete  ${product.name}?`}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ProductListItem;
