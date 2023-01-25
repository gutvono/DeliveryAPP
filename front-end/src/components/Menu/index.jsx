import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

function Menu() {
  const { products, setProducts } = useContext(AppContext);

  const [input, setInput] = useState({});

  const getProducts = () => {
    const array = products;
    const arrayProducts = array.map((item) => ({ ...item, quantity: 0 }));
    let obj = {};
    array.forEach((product) => {
      obj = { ...obj, [product.id]: '0' };
    });
    setInput(obj);
    setProducts(arrayProducts);
  };

  const handleIncrementProducts = (data) => {
    const newProducts = [...quantityProducts];
    const index = newProducts.indexOf((item) => item.id === data.id);
    newProducts[index].quantity += 1;
    setProducts(newProducts);
    setInput({ ...input, [data.id]: newProducts[index].quantity });
  };

  const handleDecrementProducts = (data) => {
    const newProducts = [...quantityProducts];
    const index = newProducts.indexOf((item) => item.id === data.id);
    newProducts[index].quantity -= 1;
    setProducts(newProducts);
    setInput({ ...input, [data.id]: newProducts[index].quantity });
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);
  return (
    <section>
      <div>
        { products.map((item) => (
          <div
            key={ item.id }
          >
            <img
              src={ item.urlImage }
              alt={ item.name }
              data-testid={ `customer_products__img-card-bg-image-${item.id}` }
            />
            <h3>{item.name}</h3>
            <div>
              <strong
                data-testid={ `customer_products__element-card-price-${item.id}` }
              >
                { item.price }
              </strong>
              <div>
                <div>
                  <button
                    className="text-blue-500 text-xl py-[.5rem]"
                    data-testid={ `customer_products__input-card-quantity-${item.id}` }
                    type="button"
                    onClick={ () => {
                      if (item.quantity > 0) handleDecrementProducts(item);
                    } }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name={ item.id }
                    data-testid={ `customer_products__input-card-quantity-${item.id}` }
                    value={ input[item.id] }
                    onFocus={ () => setInput({ ...input, [item.id]: '' }) }
                    onChange={ inputQuantityProducts }
                  />

                  <button
                    className="text-blue-500 text-xl"
                    data-testid={ `customer_products__button-card-add-item-${item.id}` }
                    type="button"
                    onClick={ () => handleIncrementProducts(item) }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
