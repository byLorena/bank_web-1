import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ApiFetch from '../service/ApiCalls/request';
import Swal from 'sweetalert2'

const EditCoin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();

  const saved = () => {
    try {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Edit succesfully!',
        showConfirmButton: false,
        timer: 1500
      })
      
    } catch (error) {
      console.error(error);
    }
    
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiFetch.fetchCoin + id);
        const json = await response.json();
        setName(json.name);
        setDescription(json.description);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await fetch(ApiFetch.editCoin, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        id,
        name,
        description
      })
    });
    navigate("/coins");
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Form onSubmit={handleSubmit}>
        <h1 style={{ margin: '20px' }}>Edit coin</h1>
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

        <Button variant="primary" type="submit" onClick={saved} >
          Save
        </Button>
      </Form>
    </div>
  )
}
export default EditCoin;
