/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
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
    setOrders(response.data);
  };
  const formatDate = new Date(orders.saleDate).toLocaleDateString('pt-BR');
  const handleChangeStatus = async () => {
    setDisableBtn(true);
    await api.put(
      `sales/${id}`,
      { status: 'Entregue' },
      { headers: { Authorization: token } },
    );
  };

  let changeColorStatus;
  if (orders.status === 'Pendente') {
    changeColorStatus = 'bg-yellow-500';
  } else if (orders.status === 'Preparando') {
    changeColorStatus = 'bg-blue-500';
  } else {
    changeColorStatus = 'bg-green-500';
  }

  if (orders.status === 'Entregue' && !disableBtn) setDisableBtn(true);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
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
            <main
              className="flex flex-col items-start justify-start
            max-w-[816px] w-full mx-auto mt-10 px-2"
            >
              <h2 className="text-gray-100 font-bold text-md mb-4">Detalhe do Pedido</h2>
              <div
                className="bg-gray-400 rounded w-full flex items-center justify-around
               text-gray-100 p-2 gap-4"
              >
                <strong
                  data-testid={ `${statusTestId}order-id` }
                >
                  PEDIDO
                  {' '}

                  {`000${id}`}
                </strong>
                <span
                  data-testid={ `${statusTestId}seller-name` }
                >

                  { `P. Vend: ${orders.sellerName}`}
                </span>
                <span
                  data-testid={ `${statusTestId}order-date` }
                >
                  {formatDate}

                </span>
                <span
                  className={ `${changeColorStatus} p-[.3rem] rounded` }
                  data-testid={ `${statusTestId}delivery-status<index>` }
                >
                  {orders.status}
                </span>
                <button
                  onClick={ handleChangeStatus }
                  className="text-sm bg-green-800 p-2 rounded"
                  type="button"
                  value="ENTREGUE"
                  data-testid="customer_order_details__button-delivery-check"
                  disabled={ disableBtn }
                >
                  MARCAR COMO ENTREGUE
                </button>
              </div>
              <div
                className="flex-1 overflow-auto mt-5 "
              >

                <table
                  className="w-full border-collapse min-w-[800px]"
                >
                  <thead>
                    <tr className="text-sm">
                      <th
                        className="bg-gray-400 p-4 text-left text-gray-100 font-semibold rounded-tl-md"
                      >
                        Item
                      </th>
                      <th
                        className="bg-gray-400  text-center p-4  text-gray-100 font-semibold"
                      >
                        Descrição

                      </th>
                      <th
                        className="bg-gray-400 p-4 text-left text-gray-100 font-semibold"
                      >
                        Quantidade

                      </th>
                      <th
                        className="bg-gray-400 p-4 text-left text-gray-100 font-semibold"
                      >
                        Valor Unitário

                      </th>
                      <th
                        className="bg-gray-400 p-4 text-left text-gray-100 font-semibold rounded-tr-md"
                      >
                        Sub-total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">

                    {orders.products.map((item, index) => (
                      <tr
                        className="bg-gray-900 text-gray-100"
                        key={ item.id }
                      >
                        <td
                          className="p-2 bg-green-600 w-[10px] text-center border-t-4 border-gray-600"
                          data-testid={ `${productsTestId}order-table-item-number-${index}` }
                        >
                          { index + 1 }
                        </td>
                        <td
                          className="p-2 text-center border-t-4 border-gray-600 w-1/2"

                          data-testid={ `${productsTestId}order-table-name-${index}` }
                        >
                          { item.name }
                        </td>
                        <td
                          className="p-2 text-center border-t-4 border-gray-600 "

                          data-testid={ `${productsTestId}order-table-quantity-${index}` }
                        >
                          { item.quantity }
                        </td>
                        <td
                          className="p-2 text-center border-t-4 border-gray-600 "
                          data-testid={ `${productsTestId}order-table-unit-price-${index}` }
                        >
                          { `R$ ${item.price}` }

                        </td>
                        <td
                          className="p-2 text-center border-t-4 border-gray-600 "
                          data-testid={ `${productsTestId}order-table-sub-total-${index}` }
                        >
                          R$
                          {' '}

                          { (item.quantity * item.price) }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <span
                    className="fixed bottom-0 right-0 rounded m-4 bg-green-700 text-gray-100 p-4"
                    data-testid={ `${productsTestId}order-total-price` }
                  >
                    { `Total: R$ ${orders.totalPrice}` }

                  </span>
                </table>
              </div>

            </main>
          )

      }
    </>

  );
}

export default OrdersDetails;
