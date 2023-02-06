/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
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

  let changeColorStatus;
  if (status === 'Pendente') {
    changeColorStatus = 'bg-yellow-500';
  } else if (status === 'Preparando') {
    changeColorStatus = 'bg-blue-500';
  } else {
    changeColorStatus = 'bg-green-500';
  }
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Header
        roleSeller="PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />
      {order
      && (
        <main
          className="flex flex-col items-start justify-start
        max-w-[816px] w-full mx-auto mt-10 px-2"
        >
          <div
            className="bg-gray-400 rounded w-full flex items-center justify-around
               text-gray-100 p-2 gap-4"
          >
            <strong
              data-testid={ `${dataTest}element-order-details-label-order-id` }
            >
              {`000${id}`}
            </strong>
            <p
              data-testid={ `${dataTest}element-order-details-label-order-date` }
            >
              { transformDate(order.saleDate) }
            </p>
            <p
              className={ `${changeColorStatus} p-[.3rem] rounded` }
              data-testid={ `${dataTest}element-order-details-label-delivery-status` }
            >
              {status}
            </p>
            <button
              className="bg-blue-500 p-[.3rem] rounded "
              type="button"
              data-testid={ `${dataTest}button-preparing-check` }
              onClick={ () => handleChangeStatus(order.status) }
              disabled={ order.status !== 'Pendente' }
            >
              PREPARAR PEDIDO
            </button>
            <button
              className="bg-green-800 p-[.3rem] rounded "
              type="button"
              data-testid={ `${dataTest}button-dispatch-check` }
              onClick={ () => handleChangeStatus(order.status) }
              disabled={ order.status !== 'Preparando' }
            >
              SAIU PARA ENTREGA
            </button>
          </div>
          <div className="flex-1 overflow-auto mt-5 ">

            <table className="w-full border-collapse min-w-[800px]">
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
              <tbody>

                {order.products.map((item, i) => (
                  <tr
                    className="bg-gray-900 text-gray-100"
                    key={ item.id }
                  >
                    <th
                      className="p-2 bg-green-600 w-[10px] text-center border-t-4 border-gray-600"
                      data-testid={ `${dataTest}element-order-table-item-number-${i}` }
                    >
                      {i + 1}
                    </th>
                    <th
                      className="p-2 text-center border-t-4 border-gray-600 w-1/2"
                      data-testid={ `${dataTest}element-order-table-name-${i}` }
                    >
                      {item.name}
                    </th>
                    <th
                      className="p-2 text-center border-t-4 border-gray-600 "
                      data-testid={ `${dataTest}element-order-table-quantity-${i}` }
                    >
                      {item.quantity}
                    </th>
                    <th
                      data-testid={ `${dataTest}element-order-table-unit-price-${i}` }
                      className="p-2 text-center border-t-4 border-gray-600 "

                    >
                      {priceFormatter.format(item.price)}

                    </th>
                    <th
                      className="p-2 text-center border-t-4 border-gray-600 "
                      data-testid={ `${dataTest}element-order-table-sub-total-${i}` }
                    >
                      {priceFormatter.format(item.quantity * item.price)}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span
            className="fixed bottom-0 right-0 rounded m-4 bg-green-700 text-gray-100 p-4"
            data-testid={ `${dataTest}element-order-total-price` }
          >
            { `Total: ${priceFormatter.format(order.totalPrice)}` }
          </span>
        </main>
      )}

    </>
  );
}

export default SellerOrdersDetails;
