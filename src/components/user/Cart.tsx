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
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
      >
        <FaShoppingCart size={24} />
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          onClick={toggleCart}
        >
          <div
            className={`bg-[#161616] w-5/6 h-5/6 p-4 overflow-y-auto rounded-2xl shadow-lg transition-transform duration-300 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-PretendardSemiBold mb-4 text-white">
              장바구니
            </div>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="text-white">{item.name}</div>
                    <div className="text-white">{item.price}원</div>
                    <div className="text-white">수량: {item.quantity}</div>
                  </div>
                ))}
                <div className="flex justify-between items-end mt-auto text-white">
                  <button
                    onClick={handleClearCart}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg"
                  >
                    장바구니 초기화
                  </button>
                  총 가격:{' '}
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  원
                </div>
              </>
            ) : (
              <p className="text-white">장바구니에 아이템이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
