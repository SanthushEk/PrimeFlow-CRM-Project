import { useState } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  const showNotification = (type, message) => {
    setNotification({
      open: true,
      type,
      message,
    });

    setTimeout(() => {
      setNotification({
        open: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  return { notification, showNotification };
}