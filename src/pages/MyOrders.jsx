import { useContext } from 'react';
import { Layout, OrdersCard } from '../components';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import { GoToTop } from '../utils';

export const MyOrders = () => {
  const context = useContext(Context);
  GoToTop();

  return (
    <Layout>
      <h1 className='mb-5 font-bold text-2xl'>My Orders</h1>
      {context.order.length > 0 ? (
        context.order.map((order, index) => (
          <Link to={`/my-orders/${index}`} key={order.id + index}>
            <OrdersCard
              key={order.id + index} // unique key
              id={order.id}
              date={order.date}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))
      ) : (
        <p className='text-center text-gray-500 mt-10'>You have no orders yet 😣</p>
      )}
    </Layout>
  );
};
