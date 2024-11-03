import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleClearCart = () => {
    sessionStorage.removeItem('cart');
    setCartItems([]);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCartItems(storedCartItems);
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300"
      >
        <FaShoppingCart size={24} />
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          onClick={toggleCart}
        >
          <div
            className={`bg-white w-5/6 max-w-lg h-5/6 p-6 overflow-y-auto rounded-2xl shadow-lg transition-transform duration-300 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-semibold mb-4 text-gray-800">
              장바구니
            </div>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2 p-2 border-b border-gray-200"
                  >
                    <div className="text-gray-800">{item.name}</div>
                    <div className="text-gray-800">{item.price}원</div>
                    <div className="text-gray-800">수량: {item.quantity}</div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4 text-gray-800">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-lg transition duration-300"
                  >
                    장바구니 초기화
                  </button>
                  <div className="text-lg font-semibold">
                    총 가격:{' '}
                    {cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                    원
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-800">장바구니에 아이템이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
