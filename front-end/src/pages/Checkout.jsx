import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardCheckout from '../components/CardCheckout';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import api from '../service/api';

function Checkout() {
  const { productsToCart, cartOrdersTotalPrice } = useContext(AppContext);
  const [sellerId, setSellerId] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  const sellers = [
    { name: 'Choose a seller', id: 0 },
    { name: 'Fulana Pereira ', id: 1 },
  ];

  function handleCheckout(e) {
    e.preventDefault();
    const body = {
      products: productsToCart.map(({ id, quantity }) => ({ id, qtd: quantity })),
      details: { sellerId, address, number },
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    api.post('customer/checkout', body, { headers: { Authorization: token } })
      .then(({ data }) => navigate(`/customer/orders${data.id}`));
  }

  return (
    <>
      <Header
        products="PRODUTOS"
        requests="MEUS PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />
      <main>
        <div>
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
        </div>
        <p>Detalhes e endereço para entrega</p>
        <form onSubmit={ handleCheckout }>
          <p>Vendedor responsável</p>
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target: { value } }) => setSellerId(value) }
          >
            {sellers.map((option) => (
              <option key={ option.id } value={ option.id }>
                {option.name}
              </option>
            ))}
          </select>
          <p>Endereço</p>
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            onChange={ ({ target: { value } }) => setAddress(value) }
            placeholder="Rua do bar do zé, Bairro barlandia"
          />
          <p>Número</p>
          <input
            data-testid="customer_checkout__input-address-number"
            type="text"
            onChange={ ({ target: { value } }) => setNumber(value) }
            placeholder="51"
          />
          <br />
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </main>
    </>
  );
}

export default Checkout;
