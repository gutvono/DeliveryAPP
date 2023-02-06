/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
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
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
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
      <main
        className="flex flex-col items-start justify-start
            max-w-[816px] w-full mx-auto mt-10 px-2"
      >
        <div className="flex-1 overflow-auto mt-5 ">
          <h2 className="text-gray-100 font-bold mb-4">Finalizar Pedido</h2>
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="text-sm">
                <th
                  className="bg-gray-400 p-4 text-left text-gray-100 font-semibold rounded-tl-md"
                >
                  Item
                </th>
                <th
                  className="bg-gray-400 w-1/3 text-center p-2  text-gray-100 font-semibold"
                >
                  Descrição

                </th>
                <th
                  className="bg-gray-400 p-2 text-center text-gray-100 font-semibold"
                >
                  Quantidade

                </th>
                <th
                  className="bg-gray-400 p-2 text-center text-gray-100 font-semibold"
                >
                  Valor Unitário

                </th>
                <th
                  className="bg-gray-400 p-2 text-center text-gray-100 font-semibold"
                >
                  Sub-total
                </th>
                <th
                  className="bg-gray-400 p-2 text-center text-gray-100 font-semibold rounded-tr-md"
                >
                  remover item
                </th>
              </tr>
            </thead>
            <tbody>

              { productsToCart?.map((item, i) => (
                <CardCheckout
                  key={ item.id }
                  product={ item }
                  i={ i }
                />
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="flex items-center justify-end w-full mt-4 text-gray-100 "
          data-testid="customer_checkout__element-order-total-price"
        >
          <strong className=" bg-green-700 p-2 rounded">
            Total:
            {' '}
            {priceFormatter.format(cartOrdersTotalPrice)}

          </strong>
        </div>
        <h2 className="text-gray-100 font-bold mb-4 mt-10">Detalhes e endereço para entrega</h2>
        <form
          onSubmit={ handleCheckout }
          className="bg-gray-900 text-gray-100 min-w-[800px] rounded "
        >
          <div className="flex w-full items-center justify-around p-4 gap-4">

            <div className="flex flex-col items-start justify-center gap-1">
              <span className="font-light">Vendedor responsável</span>
              <select
                className="bg-gray-500 p-2 rounded "
                data-testid="customer_checkout__select-seller"
                onChange={ ({ target: { value } }) => setSellerId(value) }
              >
                <option className="text-gray-300">Choose one seller</option>
                {sellers.map((option) => (
                  <option className="text-gray-300" key={ option.id } value={ option.id }>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start w-1/2 justify-center gap-1 ">
              <span className="font-light">Endereço</span>
              <input
                className="bg-gray-500 p-2 w-full rounded placeholder:text-gray-300"
                data-testid="customer_checkout__input-address"
                type="text"
                onChange={ ({ target: { value } }) => setAddress(value) }
                placeholder="Ex. Rua do zé"
              />
            </div>
            <div
              className="flex flex-col items-start justify-center gap-1"
            >
              <span className="font-light">Número</span>
              <input
                className="bg-gray-500 p-2  w-[7rem] rounded placeholder:text-gray-300"
                data-testid="customer_checkout__input-address-number"
                type="text"
                onChange={ ({ target: { value } }) => setNumber(value) }
                placeholder="00"
              />
            </div>

          </div>
          <div
            className="flex items-center justify-center w-full"

          >
            <button
              className="p-2 rounded m-2 bg-green-600"
              data-testid="customer_checkout__button-submit-order"
              type="submit"
            >
              FINALIZAR PEDIDO
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Checkout;
