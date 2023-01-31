import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { produce } from 'immer';
import api from '../service/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsToCart, setProductsToCart] = useState(() => {
    const storageStateCart = localStorage.getItem('carrinho');
    if (storageStateCart) {
      return JSON.parse(storageStateCart);
    }
    return [];
  });

  const getProducts = async () => {
    const result = await api.get('products');
    setProducts(result.data);
  };
  // const cartLS = JSON.parse(localStorage.getItem('carrinho'));
  let cartOrdersTotalPrice = productsToCart
    .reduce((acc, item) => acc + Number(item.price) * item.quantityProducts, 0);

  const addProductToCart = (product) => {
    const checkIfProductsExists = productsToCart.findIndex(
      (cart) => cart.id === product.id,
    );

    const newProduct = produce(productsToCart, (draft) => {
      if (checkIfProductsExists < 0) {
        draft.push(product);
      } else {
        draft[checkIfProductsExists].quantityProducts = product.quantityProducts;
      }
    });

    setProductsToCart(newProduct);
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(productsToCart));
    getProducts();
    console.log(productsToCart);
    if (productsToCart.length === 0) {
      cartOrdersTotalPrice = 0;
    }
  }, [productsToCart]);

  const value = useMemo(() => ({
    products,
    addProductToCart,
    cartOrdersTotalPrice,
    productsToCart,

  }), [
    products,
    addProductToCart,
    productsToCart,
  ]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
