const Card = (props) => {
  return (
    <div className="flex flex-col justify-center  px-8 py-2  border-black border-[1px] rounded-lg drop-shadow-lg bg-white space-y-8 ">
      {props.children}
    </div>
  );
};

export default Card;
