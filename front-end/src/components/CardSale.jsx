import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CardSale({ id, status, saleDate, totalPrice }, userRole) {
  const navigate = useNavigate();
  const formatDate = new Date(saleDate).toLocaleDateString('pt-BR');

  const dataTestByUser = userRole === 'customer' ? 'customer' : 'seller';

  const handleRedirectOrderDetail = () => {
    if (userRole === 'customer') {
      navigate(`/customer/orders/${id}`);
    }
    navigate(`/seller/orders/${id}`);
  };

  return (
    <button type="button" onClick={ handleRedirectOrderDetail }>
      <p
        data-testid={ `${dataTestByUser}_orders__element-order-id-${id}` }
      >
        {`Pedido${id}`}
      </p>
      <p
        data-testid={ `${dataTestByUser}_orders__element-delivery-status-${id}` }
      >
        {status}
      </p>
      <p
        data-testid={ `${dataTestByUser}_orders__element-order-date-${id}` }
      >
        {formatDate}
      </p>
      <p
        data-testid={ `${dataTestByUser}_orders__element-card-price-${id}` }
      >
        {`R$${totalPrice}`}
      </p>
    </button>
  );
}

export default CardSale;

CardSale.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.instanceOf(Date).isRequired,
  totalPrice: PropTypes.number.isRequired,
};
