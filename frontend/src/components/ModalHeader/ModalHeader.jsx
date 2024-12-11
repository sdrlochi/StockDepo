import React from 'react';
import "./ModalHeader.css"

export const ModalHeader = ({modalTitle, closeModal}) => {
  return (
    <div>
        <div className="modal-header">
          <h1>{modalTitle}</h1>
          <button onClick={() => closeModal(false)}>
            <img src="/images/Multiply.png" alt="multiply" />
          </button>
        </div>
    </div>
  )
}
