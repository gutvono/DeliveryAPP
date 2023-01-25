import { Minus, Plus } from 'phosphor-react';

function InputQuantityProductInCart(
  quantityProducts,
  onIncrease,
  onDecrease,
) {
  return (
    <>
      <button
        className="text-blue-500 text-xl py-[.5rem]"
        type="button"
        onClick={ onIncrease }
        disabled={ quantityProducts <= 1 }
      >
        <Minus size={ 14 } />

      </button>
      <span>{quantityProducts}</span>
      <button
        className="text-blue-500 text-xl"
        type="button"
        onClick={ onDecrease }
      >
        <Plus size={ 14 } />
      </button>
    </>
  );
}

export default InputQuantityProductInCart;
