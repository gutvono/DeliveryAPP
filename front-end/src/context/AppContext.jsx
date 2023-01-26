import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import api from '../service/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsToCart, setProductsToCart] = useState([]);

  const getProducts = async () => {
    const result = await api.get('products');
    setProducts(result.data);
  };

  const cartOrdersTotalPrice = productsToCart.reduce((acc, item) => acc + item.price
   * item.quantityCoffee, 0);

  const addProductToCart = (product) => {
    const checkIfProductsExists = productsToCart.findIndex(
      (cart) => cart.id === product.id,
    );
    const newProduct = produce(productsToCart, (draft) => {
      if (checkIfProductsExists < 0) {
        draft.push(product);
      } else {
        draft[checkIfProductsExists].quantityProduct += product.quantityProduct;
      }
    });
    setProductsToCart(newProduct);
    console.log(productsToCart);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const value = useMemo(() => ({
    products,
    addProductToCart,
    cartOrdersTotalPrice,

  }), [products]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

