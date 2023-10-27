const Button = ({ className, children, type, onClick }) => {
  return (
    <button
      type={`${type ? type : "button"}`}
      className={`px-4 py-2 ${className} text-white font-medium rounded-xl cursor-pointer hover:scale-110`}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
