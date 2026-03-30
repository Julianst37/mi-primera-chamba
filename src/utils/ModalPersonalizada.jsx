import { Modal, Button } from "react-bootstrap";

function ModalPersonalizada({ show, onHide, title, children, footer }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
        {footer}
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPersonalizada;