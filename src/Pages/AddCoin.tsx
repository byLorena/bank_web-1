import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ApiFetch from '../service/ApiCalls/request';
import { useNavigate } from 'react-router-dom';

const AddCoin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameValid = name.length >= 3;

  const handleChange = (event: any) => {
    setName(event.target.value);
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await fetch(ApiFetch.addCoin, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name,
        description
      })
    });
    navigate("/coins");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Form onSubmit={handleSubmit}>
        <h1 style={{ margin: '20px' }}>Add a new coin</h1>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            style={{ marginBottom: '20px', maxWidth: '300px', width: '100%' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" 
            value={description}
            style={{ marginBottom: '20px', maxWidth: '300px', width: '100%' }}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </Form.Group>


        <Button variant="primary" type="submit" disabled={!isNameValid}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCoin;