import React, { useEffect, useState, useCallback } from 'react';
import * as actions from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import { FETCH_PRODUCT_ENDPOINT } from '../../utils/Constants';
import { extractAllPrices, extractAllProducts } from '../../utils/Functions';
import { IProduct, IResponseType, IState, IPrice } from '../../utils/Types';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { Loading } from '../Loading';
import ProductListItem, { Inputs } from './ProductListItem';
import { loadFromLocalStorage } from '../../utils/LocalStorage';
import { useForm } from 'react-hook-form';

export const ProductListings = () => {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const { errors } = formState;
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const fetchProducts = useCallback(async () => {
    const currentState = loadFromLocalStorage();
    if (currentState !== undefined) {
      return;
    }

    setIsFetching(true);
    axios
      .get(FETCH_PRODUCT_ENDPOINT)
      .then((response) => {
        const fetchedProducts: IResponseType[] = response.data.products;
        const allPriceList = extractAllPrices(fetchedProducts);
        const allProducts = extractAllProducts(fetchedProducts);
        const lastProduct = allProducts[allProducts.length - 1];
        const lastProductId = lastProduct.id;
        let lastPriceId = 1;
        const lastProductPrices = allPriceList.find(
          (price) => price.productId === lastProductId
        );
        if (lastProductPrices) {
          const lastPrice =
            lastProductPrices.prices[lastProductPrices.prices.length - 1];
          lastPriceId = lastPrice.id;
        }
        const dispatchData: IState = {
          products: allProducts,
          prices: allPriceList,
          lastPriceId,
          lastProductId,
        };
        dispatch(actions.FetchProducts(dispatchData));
        setIsFetching(false);
      })
      .catch(() => setFetchingFailed(true));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const allProducts = useSelector((state: IState) => state.products);
  const allPrices = useSelector((state: IState) => state.prices);
  const lastPriceIdFromState = useSelector(
    (state: IState) => state.lastPriceId
  );
  const lastProductIdFromState = useSelector(
    (state: IState) => state.lastProductId
  );

  const handleAddNewProduct = (data: Inputs) => {
    const { productName, productPrice } = data;
    const newProduct: IProduct = {
      id: lastProductIdFromState + 1,
      name: productName,
    };
    const newProductPrice: IPrice = {
      id: lastPriceIdFromState + 1,
      price: +productPrice,
      date: new Date().toISOString(),
    };

    dispatch(
      actions.AddProduct(
        newProduct,
        { productId: newProduct.id, prices: [newProductPrice] },
        newProduct.id,
        newProductPrice.id
      )
    );
    setShowAddProductModal(!showAddProductModal);
    reset();
  };

  return (
    <Container>
      {isFetching && <Loading message="Loading drugs" />}
      <Row className="mt-5">
        <h1>mPharma Product Management</h1>
      </Row>
      <Row className="mt-5">
        <h2>Product Listings</h2>
        {!fetchingFailed && (
          <div className="float-end py-3">
            <button
              onClick={() => setShowAddProductModal(true)}
              type="button"
              className="btn btn-primary"
            >
              Add New Product
            </button>
          </div>
        )}
      </Row>
      {fetchingFailed ? (
        <h2>Error Fetching Data</h2>
      ) : (
        <Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product, index) => (
                <ProductListItem
                  product={product}
                  prices={allPrices}
                  index={index}
                  key={product.id}
                />
              ))}
            </tbody>
          </Table>
        </Row>
      )}

      <Modal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-3">
            <form onSubmit={handleSubmit(handleAddNewProduct)}>
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                {...register('productName', {
                  required: 'required',
                  minLength: {
                    value: 3,
                    message: 'Not a valid name',
                  },
                })}
                className="form-control"
              />
              <div>
                {' '}
                {errors.productName && (
                  <small className="form-text text-danger">
                    Enter a valid product name
                  </small>
                )}
              </div>
              <label htmlFor="productPrice" className="form-label mt-3">
                Product Price
              </label>
              <input
                {...register('productPrice', {
                  required: 'required',
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
    </Container>
  );
};
