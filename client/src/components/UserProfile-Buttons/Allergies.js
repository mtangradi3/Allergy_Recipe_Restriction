import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

function Allergies() {
  const [allergies, setAllergies] = useState([]);
  const [inputValueAllergy, setInputValueAllergy] = useState('');
  const [inputValueSeverity, setInputValueSeverity] = useState('');

  // adds allergy
  const handleAddAllergy = () => {
    if (inputValueAllergy.trim() !== '') {
      setAllergies([...allergies, [inputValueAllergy, inputValueSeverity]]);
      setInputValueAllergy(''); // Clear the input field
      setInputValueSeverity(''); // Clear the input field
    }
  };

  // removes allergy
  const handleRemoveAllergy = (index) => {
    const updatedItems = [...allergies];
    updatedItems.splice(index, 1);
    setAllergies(updatedItems);
  };



  return (
      <div className="m-4 p-4">
        <h2>Your Allergies</h2>
        {allergies.map((item, index) => (
            //stack shows users allergies
            <Stack
                key={index}
                direction="horizontal"
                gap={3}
                className="mb-2 p-2 border rounded"
            >
              <div className="p-2">{item[0]}</div>
              <div className="p-2 ms-auto">{item[1]}</div>
              <div className="p-2">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveAllergy(index)}
                >
                  Remove
                </Button></div>
            </Stack>
        ))}
        {/*adds new allergy to user*/}
        <Stack direction="horizontal" gap={3} >
          <Form.Control
              className="p-2"
              placeholder="Add your allergy here..."
              value={inputValueAllergy}
              onChange={(e) => setInputValueAllergy(e.target.value)}
          />
          <div className="p-2 ms-auto"><Form.Control
              className="p-2"
              placeholder="Severity 1-10"
              value={inputValueSeverity}
              onChange={(d) => setInputValueSeverity(d.target.value)}
          /></div>
          <Button variant="outline-primary" onClick={handleAddAllergy}>
            Submit
          </Button>
        </Stack>
      </div>
  );
}

export default Allergies;
