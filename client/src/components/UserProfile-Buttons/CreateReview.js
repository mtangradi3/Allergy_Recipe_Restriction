// Example for Allergies.js
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {newRating} from "../../api/userAPI";

function CreateReview() {
  const location = useLocation();
  const {email, meal } = location.state || {};
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');



  const handleFormSubmit = (event) => {
    alert(`Rating: ${rating} Review: ${review} email: ${email} meal: ${meal}`);
    try {
      if(rating !== '') {
        newRating(rating, review, email, meal).then(r => console.log(r));
      }
    }
    catch (err) {
      console.log(err.message || "An error occurred while adding a Review.");
    }

  };

  return <div><h1>Review for {meal}</h1>
    <Form>
      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control placeholder="1-10" onChange={(e) => setRating(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="review">
        <Form.Label>Review (optional)</Form.Label>
        <Form.Control as="textarea"   rows={3} onChange={(e) => setReview(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleFormSubmit}>
        Submit
      </Button>
    </Form></div>;
}

export default CreateReview;
