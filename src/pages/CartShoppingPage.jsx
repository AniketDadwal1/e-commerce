import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { GoToTop } from '../utils';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

export const CartShoppingPage = () => {

    const context = useContext(Context);
    const date = useCreateDate();
    GoToTop();

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(prod => prod.id !== id);
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout = () => {
        const orderToAdd = {
            id: new Date().getTime(),
            date: date,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.closeCheckoutSideMenu();
    }

    return (
        <Layout>
            <h1 className='mb-5 font-bold text-3xl sm:text-4xl text-center sm:text-left'>My shopping cart</h1>

            <div className='flex flex-col md:flex-row md:justify-between md:items-start max-w-screen-lg mx-auto gap-6'>
                
                {/* Products list */}
                <div className='flex-1 overflow-y-auto max-h-[60vh] md:max-h-[70vh] px-4 md:px-0'>
                    {
                        context.cartProducts.length > 0 ? context.cartProducts.map((prod) => (
                            <OrderCard
                                key={prod.id}
                                id={prod.id}
                                title={prod.title}
                                imageUrl={prod.images[0]}
                                price={prod.price}
                                handleDelete={handleDelete}
                            />
                        )) : (
                            <p className='text-gray-500 text-center mt-10'>Your cart is empty.</p>
                        )
                    }
                </div>

                {/* Summary & actions */}
                <div className='flex-shrink-0 w-full md:w-80 px-4'>
                    <p className='flex flex-row justify-between items-center mb-4'>
                        <span>Total in the shopping cart:</span>
                        <span className='font-medium text-xl sm:text-2xl text-red-800'>₹{totalPrice(context.cartProducts)}</span>
                    </p>
                    {
                        context.productsCount !== 0 &&
                        <div className='flex flex-col gap-3'>
                            <Link to='/my-orders/last'>
                                <button
                                    type='button'
                                    className='w-full p-3 bg-orange-200 rounded-lg border-2 hover:bg-orange-300 transition'
                                    onClick={handleCheckout}
                                >
                                    Buy
                                </button>
                            </Link>
                            <button
                                type='button'
                                onClick={() => context.setCartProducts([])}
                                className='w-full p-3 bg-red-200 rounded-lg border-2 hover:bg-red-300 transition'
                            >
                                Delete all items
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
};
