import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { StoreContextIn } from '../../../interfaces/autInterface';
import { useAbm } from '../../../context/StoreContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "red"
  },
};

Modal.setAppElement('#root'); // Esto es importante para accesibilidad

function ModalR() {
  const { showModalD, closeModalDialog } = useAbm() as StoreContextIn;

  return (
    <Modal
      isOpen={showModalD}
      onRequestClose={closeModalDialog}
      style={customStyles}
    >
      <div className="modal">
        <h1>HOla mundo</h1>
      </div>
    </Modal>
  );
}

ModalR.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalR;