import { createPortal } from "react-dom";

import Modal from "./Modal";

const Portal = (props) => {
  return (
    <>
      {createPortal(
        <Modal>{props.children}</Modal>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Portal;
