import CardSale from '../components/CardSale';
import Header from '../components/Header';

function Sales() {
  const sales = [
    {
      id: 1,
      status: 'PENDENTE',
      saleDate: new Date(),
      totalPrice: 52.5,
    },
    {
      id: 2,
      status: 'PENDENTE',
      saleDate: new Date(),
      totalPrice: 82.5,
    },
    {
      id: 3,
      status: 'PREPARANDO',
      saleDate: new Date(),
      totalPrice: 72.5,
    },
    {
      id: 4,
      status: 'PREPARANDO',
      saleDate: new Date(),
      totalPrice: 42.5,
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
          sales.map((sale) => (
            <CardSale
              key={ sale.id }
              id={ sale.id }
              saleDate={ sale.saleDate }
              status={ sale.status }
              totalPrice={ sale.totalPrice }
            />
          ))
        }
      </div>
    </>
  );
}

export default Sales;
