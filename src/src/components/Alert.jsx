import React, { useEffect } from "react";

const Alert = ({ message, type, onClose, duration = 3000 }) => {
  const alertStyles = {
    base: "flex items-center justify-between p-4 border rounded shadow-lg mb-4",
    success: "bg-green-200 border-green-400 text-green-800",
    error: "bg-red-200 border-red-400 text-red-800",
    warning: "bg-yellow-200 border-yellow-400 text-yellow-800",
    info: "bg-blue-200 border-blue-400 text-blue-800",
  };

  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return alertStyles.success;
      case "error":
        return alertStyles.error;
      case "warning":
        return alertStyles.warning;
      case "info":
        return alertStyles.info;
      default:
        return alertStyles.info;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${alertStyles.base} ${getAlertStyle()}`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
