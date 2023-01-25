// import { useState, useContext } from 'react';
// import { AppContext } from '../../context/AppContext';
// import PropTypes from 'prop-types';

// function Card({ id, name, price, urlImage }) {
//   const [quantityProducts, setQuantityProducts] = useState([]);
//   const [ input, setInput ] = useState({});
//   const { products, setProducts } = useContext(AppContext);

//   const getProducts = () => {
//     const array = products;
//     const arrayProducts = array.map((item) => ({ ...item, quantity: 0 }));
//     let obj = {};
//     array.forEach((product) => {
//       obj = { ...obj, [product.id]: '0' };
//     });
//     setInput(obj);
//     setProducts(arrayProducts);
//   };

//   const handleIncrementProducts = (data) => {
//     const newProducts = [...quantityProducts];
//     const index = newProducts.indexOf((item) => item.id === data.id);
//     newProducts[index].quantity += 1;
//     setProducts(newProducts);
//     setInput({ ...input, [data.id]: newProducts[index].quantity });
//   };

//   const handleDecrementProducts = () => {
//     setQuantityProducts((state) => state + 1);
//   };

//   return (
//     <div
//       key={ id }
//     >
//       <img
//         src={ urlImage }
//         alt={ name }
//         data-testid={ `customer_products__img-card-bg-image-${id}` }
//       />
//       <h3>{name}</h3>
//       <div>
//         <strong
//           data-testid={ `customer_products__element-card-price-${id}` }
//         >
//           { price }
//         </strong>
//         <div>
//           <div>
//             <button
//               className="text-blue-500 text-xl py-[.5rem]"
//               type="button"
//               onClick={ () => {
//                 if (id)
//               } }
//               disabled={ quantityProducts < 1 }
//             >
//               -
//             </button>
//             <input
//               type="number"
//               data-testid={ `customer_products__input-card-quantity-${id}` }
//               value={ 1 }
//               onChange={ quantityProducts }
//             />

//             <button
//               className="text-blue-500 text-xl"
//               type="button"
//               onClick={ handleDecrementProducts }
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;

// Card.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   urlImage: PropTypes.string.isRequired,
// };
