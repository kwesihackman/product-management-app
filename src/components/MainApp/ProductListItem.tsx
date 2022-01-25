import React, { useState, useMemo } from 'react';
import { getCurrentPrice, sortPricesByDate } from '../../utils/Functions';
import format from 'date-fns/format';
import * as action from '../../redux/actions/actions';
import { IPrice, IProduct, IProductPrices, IState } from '../../utils/Types';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const { errors } = formState;
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const currentProductPrices = prices.find(
    (priceList) => priceList.productId === product.id
  );
  const lastPriceIdFromState = useSelector(
    (state: IState) => state.lastPriceId
  );
  const currentProductPrice = getCurrentPrice(
    currentProductPrices!.prices
  ).price;
  const currentProduct = product;

  const handleDeleteProduct = () => {
    console.log(product);
    dispatch(action.DeleteProduct(index));
  };
  const sortedPrices = useMemo(
    () => sortPricesByDate(currentProductPrices!.prices),
    [currentProductPrices]
  );

  const handleEditProduct = (data: Inputs) => {
    const { productName, productPrice } = data;
    if (productName !== product.name) {
      currentProduct.name = productName;
    }

    if (+productPrice !== currentProductPrice) {
      const newPrice: IPrice = {
        id: lastPriceIdFromState + 1,
        price: +productPrice,
        date: new Date().toISOString(),
      };
      currentProductPrices!.prices.push(newPrice);
      dispatch(
        action.UpdateProduct(currentProduct, currentProductPrices!, newPrice.id)
      );
    }
    setShowEditModal(!showEditModal);
    reset();
  };

  return (
    <React.Fragment>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{currentProductPrice.toFixed(2)}</td>
        <td role="button" onClick={() => setShowDetailsModal(true)}>
          View
        </td>
        <td onClick={() => setShowEditModal(true)} role="button">
          Edit
        </td>
        <td
          role="button"
          className="text-danger"
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{`Update ${product.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-3">
            <form onSubmit={handleSubmit(handleEditProduct)}>
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                defaultValue={`${product.name}`}
                {...register('productName', {
                  required: 'required',
                  minLength: {
                    value: 3,
                    message: 'Not a valid name',
                  },
                })}
                className="form-control"
              />
              {errors.productName && (
                <small className="form-text text-danger">
                  Enter a valid product name
                </small>
              )}
              <label htmlFor="productPrice" className="form-label mt-3">
                Current Price
              </label>
              <input
                defaultValue={`${currentProductPrice}`}
                {...register('productPrice', {
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Not a valid amount',
                  },
                  min: {
                    value: 1,
                    message: 'Not a valid price',
                  },
                })}
                className={`form-control`}
              />
              {errors.productPrice && (
                <small className="form-text text-danger">
                  Enter a valid amount
                </small>
              )}

              <input type="submit" className="btn btn-primary mt-3 float-end" />
            </form>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProductListItem;
