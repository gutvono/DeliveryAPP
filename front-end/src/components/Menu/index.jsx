import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { AppContext } from '../../context/AppContext';

function Menu() {
  const { products, cartOrdersTotalPrice } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRedirectCheckout = async (event) => {
    event.preventDefault();
    navigate('/customer/checkout');
  };

  return (
    <section>
      <button
        dataTestId="customer_products__button-cart"
        type="button"
        name="orders"
        onClick={ handleRedirectCheckout }
      >
        <p>
          { `Total: R$ ${cartOrdersTotalPrice}` }
        </p>
      </button>
      <div>
        { products.map((item) => (
          <Card
            key={ item.id }
            product={ item }
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;
