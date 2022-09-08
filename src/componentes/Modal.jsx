import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function PersonModal({personaje}) {
  const [show, setShow] = useState(false);
  //Funciones que manejan la apertura y cierre del modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="btn colordonus" onClick={handleShow}>
        VER PERSONAJE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{personaje.character}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{personaje.quote}
        <img src={personaje.image}  className="card-img" alt="..."/>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" className="btn colordonus" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Example />);
export default PersonModal;