import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewLocModal({showModal, handleClose, rowData}) {
  if (rowData !== null){
    return (
        <>
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Localização</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="d-block"><b>CEP:</b> {rowData.original.cep}</span>
                <span className="d-block"><b>Estado:</b> {rowData.original.estado}</span>
                <span className="d-block"><b>Cidade:</b> {rowData.original.cidade}</span>
                <span className="d-block"><b>Rua:</b> {rowData.original.rua}</span>
                <span className="d-block"><b>Número:</b> {rowData.original.numero}</span>
                <span className="d-block"><b>Complemento:</b> {rowData.original.complemento}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
  }
}

export default ViewLocModal;