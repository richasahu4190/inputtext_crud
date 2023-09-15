import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [itemName, setItemName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Define the URL of your Node.js backend API
      const apiUrl = 'http://localhost:5000/'; // Change this to your actual API endpoint

      // Create the data to send in the POST request
      const postData = { input_text: itemName };

      // Make a POST request to the backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Item "${data.input_text}" created successfully.`);
        setItemName(''); // Clear the input field
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <Container>
      <h2>Text Input</h2>
      <Input
        type="text"
        placeholder="Enter text"
        value={itemName}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Send</Button>
      {responseMessage && <div>{responseMessage}</div>}
    </Container>
  );
}

export default App;
