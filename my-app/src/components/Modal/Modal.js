import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { WrapperModal, WrapperOverlay } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <WrapperOverlay onClick={handleBackdropClick}>
      <WrapperModal>{children}</WrapperModal>
    </WrapperOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
