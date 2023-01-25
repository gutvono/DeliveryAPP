import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

function Card(props) {
  const { id, name, price, urlImage } = props;
  const [quantityProducts, setQuantityProducts] = useState(0);
  const { addProductToCart } = useContext(AppContext);

  const handleIncrementProducts = () => {
    setQuantityProducts((state) => state + 1);
  };

  const handleDecrementProducts = () => {
    setQuantityProducts((state) => state - 1);
  };

  const handleAddProductToCart = () => {
    const productToCart = {
      ...props,
      quantityProducts,
    };
    addProductToCart(productToCart);
  };

  return (
    <div
      key={ id }
    >
      <img
        src={ urlImage }
        alt={ name }
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
              onChange={ quantityProducts }
            />

            <button
              className="text-blue-500 text-xl"
              type="button"
              onClick={ handleIncrementProducts }
            >
              +
            </button>
            <button
              type="button"
              onClick={ handleAddProductToCart }
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};
