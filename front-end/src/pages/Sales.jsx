import { useEffect, useState } from 'react';
import CardSale from '../components/CardSale';
import Header from '../components/Header';
import api from '../service/api';

function Sales() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await api.get('orders', { headers: { Authorization: token } });
    setOrders(response.data);
  };

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
      <div>
        {
          orders.map((sale) => (
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
