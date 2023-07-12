import { toast } from "react-toastify";

export const openToastifyMessage = (type, message) => {
  if (type == "success") {
    toast.success(message);
  } else if (type == "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};

const ToastifyMessage = ({ children, message, type = "default" }) => {
  const handleClick = () => {
    openToastifyMessage(type, message);
  };
  return (
    <div className="bg-blue-200" onClick={handleClick}>
      {children}
    </div>
  );
};

export default ToastifyMessage;
