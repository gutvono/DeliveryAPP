// import { useParams } from 'react-router-dom';

const statusTestId = 'customer_order_details__element-order-details-label-';
const productsTestId = 'customer_order_details__element-';

function OrdersDetails() {
  // const { id } = useParams();
  const orders = {
    id: 1,
    status: 'PENDENTE',
    saleDate: new Date(),
    totalPrice: 52.5,
    seller: 'Fulana',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        quantityProducts: 1,
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '15.00',
        quantityProducts: 2,
      },
      {
        id: 6,
        name: 'Skol Beats Senses 313ml',
        price: '22.50',
        quantityProducts: 3,
      },
    ],
  };
  const dateFormatter = new Intl.DateTimeFormat('pt-BR');
  return (
    <>
      <div>
        <p
          data-testid={ `${statusTestId}order-id` }
        >
          {`000${orders.id}`}
        </p>
        <p
          data-testid={ `${statusTestId}seller-name` }
        >
          {orders.seller}
        </p>
        <p
          data-testid={ `${statusTestId}order-date` }
        >
          { dateFormatter.format(orders.saleDate) }

        </p>
        <p
          data-testid={ `${statusTestId}delivery-status<index>` }
        >
          {orders.status}

        </p>
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
              { item.quantityProducts }
            </p>
            <p
              data-testid={ `${productsTestId}order-table-unit-price-${index}` }

            >
              { item.price }

            </p>
            <p
              data-testid={ `${productsTestId}order-table-sub-total-${index}` }
            >
              { (item.quantityProducts * item.price) }
            </p>
          </div>
        ))}
        <p
          data-testid={ `${productsTestId}order-total-price` }

        >
          { orders.totalPrice }

        </p>
      </div>
    </>
  );
}

export default OrdersDetails;
