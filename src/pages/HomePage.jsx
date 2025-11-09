import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { Context } from '../context';
import { GoToTop } from '../utils';

export const HomePage = () => {
  const context = useContext(Context);
  const navigate = useNavigate();
  GoToTop();

  const handleCardClick = (item) => {
    context.setShowProductDetail(item); // Selected product ko context me store
    navigate(`/product/${item.id}`);     // DetailProduct page pe navigate
  };

  return (
    <Layout>
      {/* Page Heading */}
      <h1 className='mb-5 font-bold text-3xl sm:text-4xl text-center sm:text-left'>
        AniStore
      </h1>

      {/* Search Box */}
            <div className='w-full max-w-md mx-auto sm:mx-0 mb-8'>
              <input
                type='text'
                placeholder='Search product...'
                className="w-full max-w-md mx-auto sm:mx-0 p-3 sm:p-3.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"

                onChange={(e) => context.setSearchByTitle(e.target.value)}
              />
            </div>


      {/* Product Grid */}
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg mx-auto'>
        {context.filteredItems && context.filteredItems.length > 0 ? (
          context.filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className='border rounded-lg p-3 cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex flex-col items-center'
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className='h-40 sm:h-48 w-full object-contain mb-2 transition-transform duration-300'
              />
              <p className='font-semibold text-center'>{item.title}</p>
              <p className='text-red-600 font-bold mt-1'>₹{item.price}</p>
            </div>
          ))
        ) : (
          <p className='mt-10 col-span-full text-center text-gray-500 text-lg'>
            No results found 😣
          </p>
        )}
      </div>
    </Layout>
  );
};
