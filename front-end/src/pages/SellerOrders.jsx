/* eslint-disable sonarjs/no-duplicate-string */
import { useState, useEffect } from 'react';
import CardSale from '../components/CardOrders';
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
        user={ JSON.parse(localStorage.getItem('user')).name }
        roleSeller="PEDIDOS"
      />
      <div className="flex flex-wrap gap-9  justify-center items-center mt-6">
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
