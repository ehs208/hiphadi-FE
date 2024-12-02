import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartItemRow: React.FC<{
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  isRemoving: boolean;
}> = ({ item, onIncrease, onDecrease, isRemoving }) => (
  <div
    className={`flex w-full items-center mb-2 p-2  transition duration-300 transform ${isRemoving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
  >
    <div className="text-white w-1/2 pr-2 text-sm sm:text-base truncate">
      {item.name}
    </div>
    <div className="flex w-1/2 items-center justify-end">
      <div className="text-white text-right font-semibold text-sm sm:text-base mr-2">
        {(item.price * item.quantity).toLocaleString()}원
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onDecrease(item.id)}
          className="bg-red-700 hover:bg-red-800 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md transition duration-300"
        >
          -
        </button>
        <div className="text-white font-semibold text-sm sm:text-lg">
          {item.quantity}
        </div>
        <button
          onClick={() => onIncrease(item.id)}
          className="bg-green-700 hover:bg-green-800 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md transition duration-300"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemsToRemove, setItemsToRemove] = useState<number[]>([]);

  const toggleCart = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    sessionStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleClearCart = () => {
    setItemsToRemove(cartItems.map((item) => item.id));
    setTimeout(() => {
      updateCart([]);
      setItemsToRemove([]);
    }, 300);
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCartItems);
  };

  const handleDecreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    );

    const itemToRemove = updatedCartItems.find(
      (item) => item.id === id && item.quantity === 0
    );

    if (itemToRemove) {
      setItemsToRemove((prev) => [...prev, id]);
      setTimeout(() => {
        const filteredCartItems = updatedCartItems.filter(
          (item) => item.id !== id
        );
        updateCart(filteredCartItems);
        setItemsToRemove((prev) => prev.filter((itemId) => itemId !== id));
      }, 300);
    } else {
      updateCart(updatedCartItems);
    }
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCartItems(storedCartItems);
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 group"
      >
        <FaShoppingCart />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 group-hover:bg-red-600">
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          onClick={toggleCart}
        >
          <div
            className={`bg-[#1f1f1f] w-5/6 max-w-lg h-5/6 p-4 sm:p-6 overflow-y-auto rounded-2xl shadow-lg transition-transform duration-300 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">장바구니</h2>
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-red-400 hover:text-red-500 transition duration-300"
                >
                  🗑️
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              <>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onIncrease={handleIncreaseQuantity}
                      onDecrease={handleDecreaseQuantity}
                      isRemoving={itemsToRemove.includes(item.id)}
                    />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                  <div className="text-white font-semibold text-lg">
                    총 결제 금액
                  </div>
                  <div className="text-2xl text-white font-bold">
                    {calculateTotalPrice().toLocaleString()}원
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-center py-8">
                장바구니에 상품이 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
