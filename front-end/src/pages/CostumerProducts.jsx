import Menu from '../components/Menu';
import Header from '../components/Header';

function CustomerProducts() {
  return (
    <>
      <Header
        products="PRODUTOS"
        requests="MEUS PEDIDOS"
        user={ JSON.parse(localStorage.getItem('user')).name }
      />
      <Menu />
    </>
  );
}

export default CustomerProducts;
