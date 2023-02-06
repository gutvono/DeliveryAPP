import { useEffect, useState } from 'react';
import CardOrders from '../components/CardOrders';
import Header from '../components/Header';
import api from '../service/api';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await api
      .get('customer/orders', { headers: { Authorization: token } });
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
      <div className="flex flex-wrap gap-9  justify-center items-center mt-6">
        {
          orders.map((sale) => (
            <CardOrders
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

export default CustomerOrders;
