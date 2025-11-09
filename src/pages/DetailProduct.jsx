import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
import { Layout } from '../components';
import { ChevronLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { GoToTop } from '../utils';

export const DetailProduct = () => {
  const context = useContext(Context);
  GoToTop();

  const navigate = useNavigate();
  const onNavigateBack = () => navigate(-1);

  const product = context.showProductDetail;
  if (!product || !product.images) {
    return (
      <Layout>
        <p className='text-center mt-10 text-gray-500'>Select a product first 😣</p>
      </Layout>
    );
  }

  const [mainImage, setMainImage] = useState(product.images[0]);
  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  const addProductsToCart = (productData) => {
    context.setCartProducts([...context.cartProducts, productData]);
    context.setShowCheckoutMenu(true); // Mobile open
  };

  return (
    <Layout>
      <div className='w-full max-w-screen-lg mx-auto mt-10 px-4 sm:px-0'>
        <button className='flex items-center font-light mb-4' onClick={onNavigateBack}>
          <ChevronLeftIcon className='h-4 w-4 text-black mr-1' /> Return
        </button>

        <div className='flex flex-col md:flex-row gap-6 mb-10'>
          <figure className='w-full md:w-1/3'>
            <img className='w-full h-60 sm:h-72 object-contain mb-2' src={mainImage} alt={product.title} />
            <div className='flex gap-2 overflow-x-auto'>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  className='border h-20 object-contain cursor-pointer flex-shrink-0'
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </figure>

          <div className='w-full md:w-1/2 flex flex-col px-2'>
            <h1 className='text-black font-bold text-2xl sm:text-3xl mb-3'>{product.title}</h1>

            <div className='flex gap-1 mb-3'>
              {[1,2,3,4,5].map(star => (
                <StarIcon key={star} className={product.rate >= star ? 'h-5 w-5 text-orange-400' : 'h-5 w-5 text-gray-300'} />
              ))}
            </div>

            <p className='mb-1'>Brand: <span className='font-semibold'>{product.brand}</span></p>
            <p className='mb-1'>Stock available: <span className='font-semibold'>{product.quantity}</span></p>
            <p className='mb-1'>Category: <span className='font-light'>{product.category}</span></p>

            <p className='font-bold mt-3 flex items-center'>
              Price: <span className='text-red-800 text-2xl ml-2'>₹{product.price}</span>
            </p>

            <p className='font-bold mt-3'>About this article</p>
            <p className='mb-4'>{product.description}</p>

            <button
              className='flex items-center gap-1 bg-orange-200 font-bold py-2 px-3 rounded-lg w-full sm:w-auto justify-center'
              onClick={() => addProductsToCart(product)}
            >
              <ShoppingCartIcon className='h-5 w-5' /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
