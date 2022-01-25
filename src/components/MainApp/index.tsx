import React, { useEffect, useState, useCallback } from 'react';
import * as actions from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import { FETCH_PRODUCT_ENDPOINT } from '../../utils/Constants';
import { extractAllPrices, extractAllProducts } from '../../utils/Functions';
import { IResponseType, IState } from '../../utils/Types';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { Loading } from '../Loading';
import ProductListItem, { Inputs } from './ProductListItem';
import { loadFromLocalStorage } from '../../utils/LocalStorage';

export const ProductListings = () => {
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

  return (
    <Container>
      {isFetching && <Loading message="Loading drugs" />}
      <Row className="mt-5">
        <h1>mPharma Product Management</h1>
      </Row>
      <Row className="mt-5">
        <h2>Product Listings</h2>
      </Row>

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
    </Container>
  );
};
