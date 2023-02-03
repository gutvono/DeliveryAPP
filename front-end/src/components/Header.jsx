import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function Header({ requests, products, user, roleSeller }) {
  const navigate = useNavigate();
  const { role } = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="max-w-[1100px] flex items-center justify-between mx-auto ">
      { role === 'customer' && (
        <Link
          className="ColorTextDark"
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
        className="flex items-center justify-center w-[32rem] bg-green-800"
        to={ `/${role}/orders` }
      >
        <h2
          data-testid="customer_products__element-navbar-link-orders"
          className="  text-gray-100 p-[16px]"
        >
          { requests || roleSeller }
        </h2>
      </Link>
      <div
        className="
        flex items-center justify-center
         text-gray-200 w-[10rem] bg-purple-600 p-[20px]"
      >
        <span
          data-testid="customer_products__element-navbar-user-full-name"
          className="text-xs text-gray-100"
        >
          { user }
        </span>
      </div>
      <button
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
    </header>
  );
}

Header.propTypes = {
  img: PropTypes.string,
  username: PropTypes.string,
}.isRequired;

export default Header;
