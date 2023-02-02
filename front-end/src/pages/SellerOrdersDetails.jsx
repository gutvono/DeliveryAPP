import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../service/api';

function SellerOrdersDetails() {
  const [order, setOrder] = useState();
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const dataTest = 'seller_order_details__';

  const transformDate = (date) => {
    const nDate = date.split('T')[0];
    return nDate.split('-').reverse().join('/');
  };

  const { token } = JSON.parse(localStorage.getItem('user'));
  function getOrder() {
    api.get(`seller/orders/${id}`, { headers: { Authorization: token } })
      .then(({ data }) => {
        setOrder(data);
        setStatus(data.status);
      });
  }

  async function handleChangeStatus(orderStatus) {
    if (orderStatus === 'Pendente') {
      await api.put(
        `sales/${id}`,
        { status: 'Preparando' },
        { headers: { Authorization: token } },
      );
    } else {
      await api.put(
        `sales/${id}`,
        { status: 'Em Trânsito' },
        { headers: { Authorization: token } },
      );
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Header />
      {order
      && (
        <div>
          <div>
            <p
              data-testid={ `${dataTest}element-order-details-label-order-id` }
            >
              {`000${id}`}
            </p>
            <p
              data-testid={ `${dataTest}element-order-details-label-order-date` }
            >
              { transformDate(order.saleDate) }
            </p>
            <p
              data-testid={ `${dataTest}element-order-details-label-delivery-status` }
            >
              {status}
            </p>
            <button
              type="button"
              data-testid={ `${dataTest}button-preparing-check` }
              onClick={ () => handleChangeStatus(order.status) }
              disabled={ order.status !== 'Pendente' }
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              data-testid={ `${dataTest}button-dispatch-check` }
              onClick={ () => handleChangeStatus(order.status) }
              disabled={ order.status !== 'Preparando' }
            >
              SAIU PARA ENTREGA
            </button>
          </div>
          <div>
            {order.products.map((item, i) => (
              <div key={ item.id }>
                <p
                  data-testid={ `${dataTest}element-order-table-item-number-${i}` }
                >
                  {` Item: ${i + 1} `}
                </p>
                <p
                  data-testid={ `${dataTest}element-order-table-name-${i}` }
                >
                  {` Descrição: ${item.name} `}
                </p>
                <p
                  data-testid={ `${dataTest}element-order-table-quantity-${i}` }
                >
                  {` Quantidade: ${item.quantity} `}
                </p>
                <p
                  data-testid={ `${dataTest}element-order-table-unit-price-${i}` }

                >
                  {` Valor unitário: ${item.price.toString().replace('.', ',')} `}

                </p>
                <p
                  data-testid={ `${dataTest}element-order-table-sub-total-${i}` }
                >
                  {` Sub-total: ${(item.quantity * item.price)
                    .toString().replace('.', ',')} `}
                </p>
              </div>
            ))}
            <p
              data-testid={ `${dataTest}element-order-total-price` }
            >
              { order.totalPrice.toString().replace('.', ',') }
            </p>
          </div>
        </div>
      )}

    </>
  );
}

export default SellerOrdersDetails;
