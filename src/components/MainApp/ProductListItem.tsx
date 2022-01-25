import React, { useState, useMemo } from 'react';
import { getCurrentPrice, sortPricesByDate } from '../../utils/Functions';
import format from 'date-fns/format';
import * as action from '../../redux/actions/actions';
import { IProduct, IProductPrices } from '../../utils/Types';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
  const sortedPrices = useMemo(
    () => sortPricesByDate(currentProductPrices!.prices),
    [currentProductPrices]
  );

  return (
    <React.Fragment>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{currentProductPrice.toFixed(2)}</td>
        <td
          role="button"
          className="cursor-pointer"
          onClick={() => setShowDetailsModal(true)}
        >
          View
        </td>
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
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-2 text-center">
            <div className="text-center">{`Historical Prices for  ${product.name}`}</div>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {sortedPrices.map((priceList, index) => (
                  <tr key={`${priceList.id} - ${index}`}>
                    <td>{format(new Date(priceList.date), 'dd/MM/yyyy')}</td>
                    <td>{priceList.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ProductListItem;
