import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../service/api';
import Header from '../components/Header';

const statusTestId = 'customer_order_details__element-order-details-label-';
const productsTestId = 'customer_order_details__element-';

function OrdersDetails() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await
    api.get(`costumer/orders/${id}`, { headers: { Authorization: token } });
    setOrders(response.data);
  };
  console.log(orders);
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
      {
        orders
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
                <button
                  type="button"
                  value="ENTREGUE"
                  data-testid={ `${statusTestId}delivery-status<index>` }
                >
                  {orders.status}

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
