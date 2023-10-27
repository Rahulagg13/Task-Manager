import ReactTypingEffect from "react-typing-effect";
export const TypeEffect = (props) => {
  return (
    <>
      <ReactTypingEffect typingDelay={200} text={props.text} />
    </>
  );
};
