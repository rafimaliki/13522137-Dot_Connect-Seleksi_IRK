const Button = ({ color, onclick, title }) => {
  const colorData = {
    blue: "bg-blue-500 hover:bg-blue-700",
    red: "bg-red-500 hover:bg-red-700",
    green: "bg-green-500 hover:bg-green-700",
  };
  return (
    <button
      className={`my-2 px-3 py-0 w-[7rem] ${colorData[color]} text-white font-semibold rounded-lg shadow-md  transition duration-200 ease-in-out`}
      onClick={onclick}
    >
      {title}
    </button>
  );
};

export default Button;
