import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

function Card({ product }) {
  const { id, name, price, urlImage } = product;
  const [quantityProducts, setQuantityProducts] = useState(0);
  const { addProductToCart, productsToCart } = useContext(AppContext);

  useEffect(() => {
    const qtd = productsToCart.find((item) => item.id === id);
    if (qtd === undefined) return 0;
    setQuantityProducts(qtd.quantityProducts);
  }, []);

  useEffect(() => {
    if (quantityProducts !== 0) {
      const productToCart = {
        ...product,
        quantityProducts,
      };
      addProductToCart(productToCart);
    } else {
      const cart = JSON.parse(localStorage.getItem('carrinho'));
      const newArr = cart.filter((item) => item.id !== id);
      localStorage.setItem('carrinho', JSON.stringify(newArr));
    }
  }, [quantityProducts]);

  return (
    <div
      className=" mb-10 w-[14rem] bg-gray-400
          flex flex-col items-center justify-center
          text-center  rounded
          text-gray-100
          "
      key={ id }
    >
      <img
        className=" w-full  h-44 object-fill rounded-tl-md rounded-tr-md"
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
        className="text-left w-full px-2 py-4"
      >
        {name}

      </h3>

      <div
        className="flex text-gray-100 items-center justify-between w-full px-2 "
      >
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          style={ { fontWeight: 'bold' } }
        >
          R$
          {' '}
          { price.toString().replace('.', ',') }
        </p>
        <div
          className="flex items-center justify-center "
        >
          <button
            className="text-green-500 text-xl py-[.5rem]"
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ () => setQuantityProducts(Number(quantityProducts) - 1) }
            disabled={ quantityProducts < 1 }
          >
            -
          </button>
          <input
            className=" text-gray-100 bg-transparent flex
            items-center justify-center w-6 text-center"
            type="string"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantityProducts }
            onChange={ ({ target }) => setQuantityProducts(Number(target.value)) }
            on
          />
          <button
            className="text-green-500 text-xl"
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => setQuantityProducts(Number(quantityProducts) + 1) }
          >
            +
          </button>
        </div>
      </div>

    </div>

  );
}

export default Card;

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};
