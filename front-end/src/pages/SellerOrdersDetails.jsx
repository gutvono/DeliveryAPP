import { useState } from 'react';
import Header from '../components/Header';
import api from '../service/api';

function SellerOrdersDetails() {
  const [order, setOrder] = useState({});
  // const order = {
  //   id: 1,
  //   status: 'Pendente',
  //   saleDate: new Date(),
  //   totalPrice: 52.5,
  //   seller: 'Fulana',
  //   products: [
  //     {
  //       id: 1,
  //       name: 'Skol Lata 250ml',
  //       price: '2.20',
  //       quantityProducts: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Heineken 600ml',
  //       price: '15.00',
  //       quantityProducts: 2,
  //     },
  //     {
  //       id: 6,
  //       name: 'Skol Beats Senses 313ml',
  //       price: '22.50',
  //       quantityProducts: 3,
  //     },
  //   ],
  // };
  const url = window.location.pathname;
  api.get(`orders/${url[url.length - 1]}`).then(({ data }) => console.log(data));
  console.log(order);

  const dateFormatter = new Intl.DateTimeFormat('pt-BR');

  return (
    <>
      <Header />
      <div>
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {`000${order.id}`}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { dateFormatter.format(order.saleDate) }
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {order.status}
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div>
        {order.products.map((item, i) => (
          <div key={ item.id }>
            <p
              data-testid={ `seller_order_details__element-order-table-item-number-${i}` }
            >
              {` Item: ${i + 1} `}
            </p>
            <p
              data-testid={ `seller_order_details__element-order-table-name-${i}` }
            >
              {` Descrição: ${item.name} `}
            </p>
            <p
              data-testid={ `seller_order_details__element-order-table-quantity-${i}` }
            >
              {` Quantidade: ${item.quantityProducts} `}
            </p>
            <p
              data-testid={ `seller_order_details__element-order-table-unit-price-${i}` }

            >
              {` Valor unitário: ${item.price} `}

            </p>
            <p
              data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
            >
              {` Sub-total: ${(item.quantityProducts * item.price)} `}
            </p>
          </div>
        ))}
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          { order.totalPrice }
        </p>
      </div>
    </>
  );
}

export default SellerOrdersDetails;
