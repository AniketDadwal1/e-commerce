import { createContext, useEffect, useState } from 'react';
import { products } from '../assets/products';

export const Context = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [items, setItems] = useState(products);

  // Product detail
  const [showProductDetail, setShowProductDetail] = useState(
    JSON.parse(localStorage.getItem('productDetail')) || {}
  );
  useEffect(() => {
    localStorage.setItem('productDetail', JSON.stringify(showProductDetail));
  }, [showProductDetail]);

  // Cart
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem('comprarShopi')) || []
  );
  useEffect(() => {
    localStorage.setItem('comprarShopi', JSON.stringify(cartProducts));
  }, [cartProducts]);

  // Checkout side menu toggle (mobile + desktop)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutOpen(false);

  // Orders
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem('checkout')) || []
  );
  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(order));
  }, [order]);

  // Search & Filter
  const [searchByTitle, setSearchByTitle] = useState('');
  const [searchByCategory, setSearchByCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);

  const filterByTitle = (items, title) => {
    if (!title) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  const filterByCategory = (items, category) => {
    if (!category || category.toLowerCase() === 'all') return items;
    return items.filter(
      item => item.category.trim().toLowerCase() === category.trim().toLowerCase()
    );
  };

  useEffect(() => {
    let updatedItems = [...items];
    updatedItems = filterByCategory(updatedItems, searchByCategory);
    updatedItems = filterByTitle(updatedItems, searchByTitle);
    setFilteredItems(updatedItems);
  }, [items, searchByTitle, searchByCategory]);

  return (
    <Context.Provider
      value={{
        items,
        setItems,
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,
        cartProducts,
        setCartProducts,
        showProductDetail,
        setShowProductDetail,
        order,
        setOrder,
        isCheckoutOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
};
