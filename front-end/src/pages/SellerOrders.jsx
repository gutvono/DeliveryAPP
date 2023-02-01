/* eslint-disable sonarjs/no-duplicate-string */
import CardSale from '../components/CardSale';
import Header from '../components/Header';

function SellerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const orders = [
    {
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
    },
    {
      id: 2,
      status: 'PREPARANDO',
      saleDate: new Date(),
      totalPrice: 82.5,
      products: [
        {
          id: 5,
          name: 'Skol 269ml',
          price: '2.19',
          quantityProducts: 1,
        },
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '15.00',
          quantityProducts: 2,
        },
        {
          id: 3,
          name: 'Brahma 600ml',
          price: '22.50',
          quantityProducts: 3,
        },
      ],
    },
    {
      id: 3,
      status: 'ENTREGUE',
      saleDate: new Date(),
      totalPrice: 42.5,
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
          id: 3,
          name: 'Brahma 600ml',
          price: '22.50',
          quantityProducts: 3,
        },
      ],
    },
  ];
  return (
    <>
      <Header
        products="PRODUTOS"
        requests="MEUS PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />
      <div>
        {
          orders.map((sale) => (
            <CardSale
              key={ sale.id }
              id={ sale.id }
              saleDate={ sale.saleDate }
              status={ sale.status }
              totalPrice={ sale.totalPrice }
              userRole={ user.role }
            />
          ))
        }
      </div>
    </>
  );
}

export default SellerOrders;
