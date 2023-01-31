import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function CardCheckout({ product, i }) {
  const { removeProductFromCart } = useContext(AppContext);
  const totalPrice = product.price * product.quantityProducts;
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleRemoveProduct = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div key={ product.id }>
      <span
        data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
      >
        index
        {i + 1}
      </span>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${i}` }
      >
        {product.name}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
      >
        quantidade
        {product.quantityProducts}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
      >
        {product.price.replace('.', ',')}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
      >
        subTotal
        {priceFormatter.format(totalPrice).replace('.', ',')}
      </p>
      <button
        onClick={ handleRemoveProduct }
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${i}` }
      >
        Remove
      </button>
    </div>
  );
}

export default CardCheckout;

CardCheckout.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantityProducts: PropTypes.number,
  }).isRequired,
  i: PropTypes.number.isRequired,
};
