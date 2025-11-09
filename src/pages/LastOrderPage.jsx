import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import { GoToTop } from '../utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const LastOrderPage = () => {
  const context = useContext(Context);
  GoToTop();

  const lastOrder = context.order?.slice(-1)[0];
  const lastIndex = context.order?.length - 1;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-2xl">Current Order</h1>
        {context.order?.length > 1 && (
          <Link to="/my-orders" className="flex items-center gap-1 text-blue-500">
            See all orders <ChevronRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>

      {lastOrder && lastOrder.products.length > 0 ? (
        lastOrder.products.map((prod, index) => (
          <OrderCard
            key={`${prod.id}-${index}`}
            id={prod.id}
            title={prod.title}
            imageUrl={prod.images[0]}
            price={prod.price}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">No current orders 😣</p>
      )}
    </Layout>
  );
};
