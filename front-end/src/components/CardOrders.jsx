import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CardOrders({ id, status, saleDate, totalPrice }) {
  const navigate = useNavigate();
  const formatDate = new Date(saleDate).toLocaleDateString('pt-BR');
  const { role } = JSON.parse(localStorage.getItem('user'));

  const dataTestByUser = role === 'customer' ? 'customer' : 'seller';

  const handleRedirectOrderDetail = () => {
    navigate(`/${dataTestByUser}/orders/${id}`);
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
        {totalPrice.toFixed(2).replace('.', ',')}
      </p>
    </button>
  );
}

export default CardOrders;

CardOrders.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
  totalPrice: PropTypes.number,
  userRole: PropTypes.string,
}.isRequired;
