import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

function Card({ product }) {
  const { id, name, price, urlImage } = product;
  const [quantityProducts, setQuantityProducts] = useState(0);
  const { addProductToCart } = useContext(AppContext);

  const handleIncrementProducts = () => {
    setQuantityProducts((state) => state + 1);
  };

  const handleDecrementProducts = () => {
    setQuantityProducts((state) => state - 1);
  };

  const handleChangeQuantity = ({ target }) => {
    const newQuantity = parseInt(target.value, 10);
    if (Number.isNaN(newQuantity)) {
      return setQuantityProducts(0);
    }
    setQuantityProducts(newQuantity);
  };
  const handleAddProductToCart = () => {
    if (quantityProducts !== 0) {
      const productToCart = {
        ...product,
        quantityProducts,
      };
      addProductToCart(productToCart);
      setQuantityProducts(0);
    }
  };
  useEffect(() => {
    handleAddProductToCart();
  }, [handleAddProductToCart]);
  return (
    <div
      key={ id }
    >
      <img
        src={ urlImage }
        alt={ name }
        width={ 250 }
        height={ 250 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3>{name}</h3>
      <div>
        <strong
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price }
        </strong>
        <div>
          <div>
            <button
              className="text-blue-500 text-xl py-[.5rem]"
              type="button"
              onClick={ handleDecrementProducts }
              disabled={ quantityProducts < 1 }
            >
              -
            </button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              value={ quantityProducts }
              onChange={ handleChangeQuantity }
            />

            <button
              className="text-blue-500 text-xl"
              type="button"
              onClick={ handleIncrementProducts }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};
