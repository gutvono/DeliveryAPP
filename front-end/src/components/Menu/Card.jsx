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

  function rmvProduct() {
    if (quantityProducts === 0) {
      const cart = JSON.parse(localStorage.getItem('carrinho'));
      const rmv = cart.find((item) => item.id === id);
      const newArr = cart.filter((item) => item.id !== rmv.id);
      localStorage.setItem('carrinho', JSON.stringify(newArr));
    }
  }

  useEffect(() => {
    if (quantityProducts !== 0) {
      const productToCart = {
        ...product,
        quantityProducts,
      };
      addProductToCart(productToCart);
    }
    rmvProduct();
  }, [quantityProducts]);

  return (
    <div
      key={ id }
    >
      <img
        src={ urlImage }
        alt={ name }
        width={ 250 }
        height={ 250 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>{name}</h3>
      <div>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          style={ { fontWeight: 'bold' } }
        >
          { price.replace('.', ',') }
        </p>
        <div>
          <div>
            <button
              className="text-blue-500 text-xl py-[.5rem]"
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => setQuantityProducts(Number(quantityProducts) - 1) }
              disabled={ quantityProducts < 1 }
            >
              -
            </button>
            <input
              type="string"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              value={ quantityProducts }
              onChange={ ({ target }) => setQuantityProducts(Number(target.value)) }
            />
            <button
              className="text-blue-500 text-xl"
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => setQuantityProducts(Number(quantityProducts) + 1) }
            >
              +
            </button>
          </div>
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
