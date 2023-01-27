import { useContext } from 'react';
import CardCheckout from '../components/CardCheckout';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';

function Checkout() {
  const { productsToCart, cartOrdersTotalPrice } = useContext(AppContext);
  console.log('1', productsToCart);
  return (
    <>
      <Header
        products="PRODUTOS"
        requests="MEUS PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />

      <main>
        { productsToCart?.map((item, i) => (
          <CardCheckout
            key={ item.id }
            product={ item }
            i={ i }
          />
        ))}
        <strong
          data-testid="customer_checkout__element-order-total-price"
        >
          {`TotalPrice R$ ${cartOrdersTotalPrice}`}
        </strong>
      </main>
    </>
  );
}

export default Checkout;
