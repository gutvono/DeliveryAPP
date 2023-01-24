import Logo from '../images/logo2.svg';

function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { img, username } = props;
  return (
    <header className="max-w-[1100px] flex items-center justify-between mx-auto p-8">
      <a className="flex items-center justify-center gap-4" href="/">
        <img src={ Logo } alt="" />
        <h2 className="text-gray-200 font-semibold text-xl">App Delivery</h2>
      </a>

      <div
        className="flex items-center justify-center gap-2 text-gray-200"
      >
        <img className="w-8 rounded-full" src={ img } alt={ username } />
        <span className="text-xs text-green-500">{username}</span>
      </div>
    </header>
  );
}

export default Header;
