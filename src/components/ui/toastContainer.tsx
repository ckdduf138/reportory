import { useState, useEffect } from "react";

const ToastIcon = ({ type }: { type: "success" | "error" | "warning" | "info" }) => {
  const iconMap = {
    success: (
      <svg className="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
      </svg>
    ),
    error: (
      <svg className="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
      </svg>
    ),
    warning: (
      <svg className="shrink-0 size-4 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
      </svg>
    ),
    info: (
      <svg className="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
      </svg>
    ),
  };

  return iconMap[type] || null;
};

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

let addToastHandler: ((message: string, type: ToastProps["type"]) => void) | null = null;

export const toast = {
  success: (message: string) => addToast(message, "success"),
  error: (message: string) => addToast(message, "error"),
  warning: (message: string) => addToast(message, "warning"),
  info: (message: string) => addToast(message, "info"),
};

const addToast = (message: string, type: ToastProps["type"]) => {
  if (addToastHandler) {
    addToastHandler(message, type);
  }
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    addToastHandler = (message, type) => {
      setToasts([{ id: crypto.randomUUID(), message, type }]);
      setTimeout(() => {
        setToasts([]);
      }, 2000); 
    };

    return () => {
      addToastHandler = null;
    };
  }, []);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 space-y-3 z-50">
      {toasts.map(({ id, message, type }) => (
        <div key={id} className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg flex p-4 animate-slide-toast">
          <ToastIcon type={type} />
          <p className="ms-3 text-sm text-gray-700">{message}</p>
        </div>
      ))}
    </div>
  );
};
