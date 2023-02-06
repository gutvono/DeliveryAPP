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

  let changeColorStatus;
  if (status === 'Pendente') {
    changeColorStatus = 'bg-yellow-500';
  } else if (status === 'Preparando') {
    changeColorStatus = 'bg-blue-500';
  } else {
    changeColorStatus = 'bg-green-500';
  }

  return (
    <button
      className="bg-gray-400 flex items-center rounded
       justify-center text-gray-100 bg-c p-2 gap-2"
      type="button"
      onClick={ handleRedirectOrderDetail }
    >
      <div className="flex flex-col items-center justify-center bg-gray-700 p-2 rounded">
        <span>Pedido</span>
        <span
          data-testid={ `${dataTestByUser}_orders__element-order-id-${id}` }
        >
          000
          {id}
        </span>
      </div>
      <span
        className={ `${changeColorStatus} p-[1.3rem] rounded` }
        data-testid={ `${dataTestByUser}_orders__element-delivery-status-${id}` }
      >
        {status}
      </span>
      <div className="flex flex-col items-center justify-center gap-2">

        <data
          className="bg-gray-700 rounded p-1"
          data-testid={ `${dataTestByUser}_orders__element-order-date-${id}` }
        >
          {formatDate}
        </data>
        <strong
          className="bg-gray-700 rounded w-full "
          data-testid={ `${dataTestByUser}_orders__element-card-price-${id}` }
        >
          {totalPrice.toFixed(2).replace('.', ',')}
        </strong>
      </div>
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
