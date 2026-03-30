import Form from "react-bootstrap/Form";

function Select({ data, defaultOption, onChange }) {
  return (
    <Form.Select aria-label="Default select example" onChange={onChange}>
      <option>{defaultOption}</option>
      {data &&  data.sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Select>
  );
}

export default Select;