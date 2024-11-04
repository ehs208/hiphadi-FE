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

  const handleClearCart = () => {
    sessionStorage.removeItem('cart');
    setCartItems([]);
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
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
        setCartItems(filteredCartItems);
        sessionStorage.setItem('cart', JSON.stringify(filteredCartItems));
        setItemsToRemove((prev) => prev.filter((itemId) => itemId !== id));
      }, 300); // 애니메이션 지속 시간과 일치시킴
    } else {
      setCartItems(updatedCartItems);
      sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
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
            className={`bg-[#1f1f1f] w-5/6 max-w-lg h-5/6 p-6 overflow-y-auto rounded-2xl shadow-lg transition-transform duration-300 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-semibold mb-4 text-white">
              장바구니
            </div>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex w-full items-center mb-2 p-2 border-b border-gray-200 transition duration-300 transform ${itemsToRemove.includes(item.id) ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  >
                    <div className="text-white w-1/2">{item.name}</div>
                    <div className="flex w-1/2 items-center">
                      <div className="flex justify-center text-white w-full font-PretendardSemiBold">
                        {item.price}원
                      </div>
                      <div className="flex justify-end w-full items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                          -
                        </button>
                        <div className="text-white mx-2 font-PretendardSemiBold">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4 text-gray-800">
                  <button
                    onClick={handleClearCart}
                    className="font-PretendardLight bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-lg transition duration-300"
                  >
                    장바구니 초기화
                  </button>
                  <div className="text-lg text-white font-PretendardSemiBold">
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
              <p className="text-white">장바구니에 아이템이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
