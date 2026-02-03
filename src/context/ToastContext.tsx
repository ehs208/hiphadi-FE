import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastState {
  message: string;
  visible: boolean;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-lounge-card border border-red-400/30 rounded-lg px-5 py-3 shadow-lg max-w-sm">
            <p className="text-sm font-PretendardMedium text-red-400">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
