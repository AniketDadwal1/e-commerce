import { useContext } from 'react';
import { Context } from '../context';
import { OrderCard } from './OrderCard';
import { XMarkIcon } from '@heroicons/react/24/solid';

export const CheckoutSideMenu = () => {
  const { cartProducts, setCartProducts, isCheckoutOpen, closeCheckoutSideMenu } = useContext(Context);

  const removeItem = (id) => setCartProducts(cartProducts.filter(p => p.id !== id));
  const clearCart = () => setCartProducts([]);

  return (
    <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ${isCheckoutOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="font-bold text-lg">My Cart</h2>
        <button className="p-1" onClick={closeCheckoutSideMenu}>
          <XMarkIcon className="h-5 w-5 text-black" />
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-2">
        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty 😣</p>
        ) : cartProducts.map((product, i) => (
          <div key={`${product.id}-${i}`} className="flex items-center gap-2 border-b pb-2">
            <OrderCard id={product.id} title={product.title} imageUrl={product.images[0]} price={product.price} />
            <button className="text-red-500 font-semibold text-sm" onClick={() => removeItem(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {cartProducts.length > 0 && (
        <div className="p-3 border-t">
          <div className="font-bold mb-2">Total: ₹{cartProducts.reduce((sum, p) => sum + p.price, 0)}</div>
          <button className="bg-blue-500 text-white font-bold py-1 px-1 rounded w-full mb-2">Buy</button>
          <button className="bg-red-500 text-white font-bold py-1 px-1 rounded w-20" onClick={clearCart}>Delete all items</button>
        </div>
      )}
    </div>
  );
};
