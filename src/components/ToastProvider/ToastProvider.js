import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = (toastData) => {
    const toast = {
      id: Math.random().toString(36).slice(2),
      ...toastData,
    };
    setToasts((prevState) => [...prevState, toast]);
  };
  const dismissToast = (id) => {
    const filteredToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(filteredToasts);
  };

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
