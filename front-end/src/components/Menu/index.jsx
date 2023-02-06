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
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <section>
      <button
        className="bg-green-700 text-gray-100 font-semibold p-2
        rounded fixed bottom-0 m-4 right-0"
        data-testid="customer_products__button-cart"
        type="button"
        name="orders"
        onClick={ handleRedirectCheckout }
        disabled={ cartOrdersTotalPrice === 0 }
      >
        Carrinho
        <p data-testid="customer_products__checkout-bottom-value">
          {`Total: ${priceFormatter.format(cartOrdersTotalPrice).replace('.', ',')}`}
        </p>
      </button>
      <div className="flex flex-wrap gap-9  justify-center items-center mt-6">
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
