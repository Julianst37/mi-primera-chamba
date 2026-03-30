import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import useFetch from '../../utils/useFetch';
import SelectBoostrap from '../../utils/SelectBoostrap';
import { useState } from 'react';
import React from 'react'
import Select from 'react-select'

function FormularioCliente() {
  
  const { data: departments } = useFetch('https://api-colombia.com/api/v1/Department');

  const [departmentId, setDepartmentId] = useState(null);

 const [selectedCity, setSelectedCity] = useState(null);

    const handleCities = (value) => {
    setSelectedCity(null);
    setDepartmentId(value);
  }

  const { data: cities } = useFetch(departmentId ? `https://api-colombia.com/api/v1/Department/${departmentId}/cities` : null);



  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
      </Row>  

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="department">
            <Form.Label>Departamento</Form.Label>
            <Select options={departments ? departments.sort((a, b) => a.name.localeCompare(b.name)).map(dept => ({ value: dept.id, label: dept.name })) : []} onChange={(selectedOption) => handleCities(selectedOption.value)} placeholder="Selecciona un departamento" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3" controlId="municipality">
            <Form.Label>Municipio</Form.Label>
            <Select value={selectedCity} options={cities ? cities.sort((a, b) => a.name.localeCompare(b.name)).map(city => ({ value: city.id, label: city.name })) : []} onChange={(selectedOption) => setSelectedCity(selectedOption)} placeholder="Selecciona un municipio" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>
        </Col>
      </Row>

      <Row> 
        <Col md={4}>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
        </Col>

      </Row>
    </Form>
  );
}

export default FormularioCliente;