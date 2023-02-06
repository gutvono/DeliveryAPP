/* eslint-disable react/jsx-props-no-multi-spaces */
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
    <tr
      className="text-gray-100 bg-gray-900"
      key={ product.id }
    >
      <td
        className="p-2 bg-green-600 w-[10px] text-center border-t-4 border-gray-600"

        data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
      >
        {i + 1}
      </td>
      <td
        className="p-2 text-center border-t-4 border-gray-600"
        data-testid={ `customer_checkout__element-order-table-name-${i}` }
      >
        {product.name}
      </td>
      <td
        className="p-2 text-center border-t-4 border-gray-600 "
        data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
      >
        {product.quantityProducts}
      </td>
      <td
        className="p-2 text-center border-t-4 border-gray-600 "

        data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
      >
        {priceFormatter.format(product.price)}
      </td>
      <td
        className="p-2 text-center border-t-4 border-gray-600 "

        data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
      >
        {priceFormatter.format(totalPrice).replace('.', ',')}
      </td>
      <td
        className="bg-transparent  text-center border-t-4 border-gray-600 "
      >
        <button
          className="bg-red-600 p-2 rounded w-full"
          onClick={ handleRemoveProduct }
          type="button"
          data-testid={ `customer_checkout__element-order-table-remove-${i}` }
        >
          Remove
        </button>
      </td>
    </tr>
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
