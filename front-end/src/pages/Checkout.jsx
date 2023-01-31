import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardCheckout from '../components/CardCheckout';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import api from '../service/api';

function Checkout() {
  const { productsToCart, cartOrdersTotalPrice } = useContext(AppContext);
  const [sellerId, setSellerId] = useState('');
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  // const sellers = [
  //   { name: 'Choose a seller', id: 0 },
  //   { name: 'Fulana Pereira ', id: 2 },
  // ];

  function getSellers() {
    api.get('sellers').then(({ data }) => setSellers(data));
  }

  useEffect(getSellers, []);

  async function handleCheckout(e) {
    e.preventDefault();
    const body = {
      products: productsToCart
        .map(({ id, quantityProducts }) => ({ id, qtd: quantityProducts })),
      details: { sellerId, address, number },
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.post('sales', body, { headers: { Authorization: token } });
    navigate(`/customer/orders/${data.saleId}`);
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
            {cartOrdersTotalPrice.toString().replace('.', ',')}
          </strong>
        </div>
        <p>Detalhes e endereço para entrega</p>
        <form onSubmit={ handleCheckout }>
          <p>Vendedor responsável</p>
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target: { value } }) => setSellerId(value) }
          >
            <option value="">Choose one seller</option>
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
