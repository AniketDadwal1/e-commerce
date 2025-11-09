import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../context';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const activeStyle = "underline underline-offset-4";

export const NavBar = () => {
  const context = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ['All', 'Laptops', 'Cameras', 'Accessories', 'Headphones', 'Cellphones'];

  return (
    <nav className='fixed top-0 w-full z-20 bg-white shadow-md py-3 px-4 sm:px-8 flex justify-between items-center'>
      
      {/* Logo */}
      <div className='font-bold text-lg sm:text-xl'>
        <NavLink 
          to='/' 
          onClick={() => context.setSearchByCategory('All')}
        >
          ANISTORE
        </NavLink>
      </div>

      {/* Desktop Links */}
      <ul className='hidden sm:flex items-center gap-4'>
        {categories.map(cat => (
          <li key={cat}>
            <NavLink
              to={cat === 'All' ? '/' : `/${cat}`}
              onClick={() => context.setSearchByCategory(cat)}
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              {cat}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Links */}
      <div className='flex items-center gap-3'>
        <span className='hidden sm:block text-black/60'>Anistore.com</span>

        <NavLink 
          to='/my-orders' 
          className={({ isActive }) => isActive ? activeStyle : undefined}
        >
          My orders
        </NavLink>

        <div className='relative'>
          <NavLink to='/cart-shopping'>
            <ShoppingCartIcon className='h-5 w-5 text-black' />
          </NavLink>
          {context.cartProducts.length > 0 && (
            <div className='absolute -top-2 -right-2 flex justify-center items-center w-5 h-5 rounded-full bg-green-100 text-xs font-semibold'>
              {context.cartProducts.length}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className='sm:hidden ml-2' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3Icon className='h-6 w-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className='absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 py-2 px-4 sm:hidden'>
          {categories.map(cat => (
            <li key={cat}>
              <NavLink
                to={cat === 'All' ? '/' : `/${cat}`}
                onClick={() => {
                  context.setSearchByCategory(cat);
                  setMenuOpen(false);
                }}
                className={({ isActive }) => isActive ? activeStyle : undefined}
              >
                {cat}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink 
              to='/my-orders' 
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              My orders
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
