import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleBack}
      className="mt-12 px-12  w-12 text-lg font-bold"
    >
      Back
    </button>
  );
};

export default Back;
