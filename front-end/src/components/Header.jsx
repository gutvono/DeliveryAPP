import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function Header({ requests, products, user, roleSeller }) {
  const navigate = useNavigate();
  const { role } = JSON.parse(localStorage.getItem('user'));

  return (
    <header
      className="max-w-[1100px]
    flex items-center justify-between mx-auto
         bg-green-800"
    >

      { role === 'customer' && (
        <Link
          className="bg-green-400 p-[20px] "
          to="/customer/products"
        >
          <h2
            data-testid="customer_products__element-navbar-link-products"
          >
            { products }
          </h2>
        </Link>
      )}
      <Link
        to={ `/${role}/orders` }
      >
        <h2
          data-testid="customer_products__element-navbar-link-orders"
          className="  text-gray-100"
        >
          { requests || roleSeller }
        </h2>
      </Link>

      <div
        className="
        text-xs text-gray-100
        flex items-center justify-center
         w-[15rem]  "

      >
        <span
          className="bg-purple-600 py-6 w-[20rem] flex items-center justify-center"
          data-testid="customer_products__element-navbar-user-full-name"

        >
          { user }
        </span>
        <button
          className="flex items-center justify-center bg-blue-600
          p-[20px] w-full py-6 text-gray-200"
          type="button"
          onClick={ () => {
            navigate('/');
            localStorage.removeItem('user');
            localStorage.setItem('carrinho', JSON.stringify([]));
          } }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Log-out
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
}.isRequired;

export default Header;
