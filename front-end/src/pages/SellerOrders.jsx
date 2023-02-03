/* eslint-disable sonarjs/no-duplicate-string */
import { useState, useEffect } from 'react';
import CardSale from '../components/CardSale';
import Header from '../components/Header';
import api from '../service/api';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('seller/orders', { headers: { Authorization: token } })
      .then(({ data }) => setOrders(data));
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
              userRole={ user.role }
            />
          ))
        }
      </div>
    </>
  );
}

export default SellerOrders;
