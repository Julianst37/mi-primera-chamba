import Accordion from 'react-bootstrap/Accordion';

function AccordionPersonalizado({ header, body, index }) {
  return (
    <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{header}</Accordion.Header>
          <Accordion.Body>{body}</Accordion.Body>
        </Accordion.Item>
    </Accordion>
  );
}

export default AccordionPersonalizado;