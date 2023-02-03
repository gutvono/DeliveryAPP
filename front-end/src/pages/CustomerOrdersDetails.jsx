import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../service/api';
import Header from '../components/Header';

const statusTestId = 'customer_order_details__element-order-details-label-';
const productsTestId = 'customer_order_details__element-';

function OrdersDetails() {
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [disableBtn, setDisableBtn] = useState(false);

  const getOrders = async () => {
    const response = await
    api.get(`customer/orders/${id}`, { headers: { Authorization: token } });
    // console.log(response.data);
    setOrders(response.data);
  };

  const handleChangeStatus = async () => {
    setDisableBtn(true);
    await api.put(
      `sales/${id}`,
      { status: 'Entregue' },
      { headers: { Authorization: token } },
    );
  };

  if (orders.status === 'Entregue' && !disableBtn) setDisableBtn(true);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Header
        products="PRODUTOS"
        requests="MEUS PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />
      {console.log(orders.products)}
      {
        Object.keys(orders).length === 0
          ? <p>Carregando</p>
          : (
            <main>
              <div>
                <p
                  data-testid={ `${statusTestId}order-id` }
                >
                  {`000${id}`}
                </p>
                <p
                  data-testid={ `${statusTestId}seller-name` }
                >
                  {orders.sellerName}
                </p>
                <p
                  data-testid={ `${statusTestId}order-date` }
                >
                  {orders.saleDate}

                </p>
                <p
                  data-testid={ `${statusTestId}delivery-status<index>` }
                >
                  {orders.status}
                </p>
                <button
                  onClick={ handleChangeStatus }
                  type="button"
                  value="ENTREGUE"
                  data-testid="customer_order_details__button-delivery-check"
                  disabled={ disableBtn }
                >
                  MARCAR COMO ENTREGUE
                </button>
              </div>
              <div>
                {orders.products.map((item, index) => (
                  <div key={ item.id }>
                    <p
                      data-testid={ `${productsTestId}order-table-item-number-${index}` }
                    >
                      { index + 1 }
                    </p>
                    <p
                      data-testid={ `${productsTestId}order-table-name-${index}` }
                    >
                      { item.name }
                    </p>
                    <p
                      data-testid={ `${productsTestId}order-table-quantity-${index}` }
                    >
                      { item.quantity }
                    </p>
                    <p
                      data-testid={ `${productsTestId}order-table-unit-price-${index}` }
                    >
                      { item.price }

                    </p>
                    <p
                      data-testid={ `${productsTestId}order-table-sub-total-${index}` }
                    >
                      { (item.quantity * item.price) }
                    </p>
                  </div>
                ))}
                <p
                  data-testid={ `${productsTestId}order-total-price` }
                >
                  { orders.totalPrice }

                </p>
              </div>

            </main>
          )

      }
    </div>

  );
}

export default OrdersDetails;
