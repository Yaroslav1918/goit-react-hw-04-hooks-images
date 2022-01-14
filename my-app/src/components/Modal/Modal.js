import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { WrapperModal, WrapperOverlay } from "./Modal.styled";
// import {} from "../Modal/Modal.styled";

const modalRoot = document.querySelector("#modal-root");
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <WrapperOverlay onClick={this.handleBackdropClick}>
        <WrapperModal>{this.props.children}</WrapperModal>
      </WrapperOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
