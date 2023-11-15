// Example for Allergies.js
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {newRating} from "../../api/userAPI";
import {getMealReviews} from "../../api/mealAPI";
import Stack from "react-bootstrap/Stack";



function CreateReview() {



  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getMealReviews(meal);
        setRatingList(data);
        console.log(data);

      } catch (err) {
        console.log(err.message || "An error occurred while fetching Allergies.");
      }
    };

    fetchRatings()


  }, []);


  const location = useLocation();
  //const {email, meal } = location.state || {};
  const {email } = location.state || {};
  const meal = 'Milk';

  const [userRating, setUserRating] = useState(null);
  const [UserReview, setUserReview] = useState('');
  const [ratingList, setRatingList] = useState([]);




  const handleFormSubmit = () => {

    alert(`Rating: ${userRating} Review: ${UserReview} email: ${email} meal: ${meal}`);
    try {
      if(userRating !== '' && UserReview !== '') {
        //newRating(userRating, UserReview, email, meal).then(r => console.log(r));
        newRating(userRating, UserReview, email, meal).then(r => console.log(r));
      }
      else if (userRating !== '') {
        //newRating(userRating, email, meal).then(r => console.log(r));
      }
    }
    catch (err) {
      console.log(err.message || "An error occurred while adding a Review.");
    }

  };

  return <div>
    <h1>Reviews for {meal}</h1>
    <Form>
      <Form.Label><h4>New Rating</h4></Form.Label>
      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control placeholder="1-5" onChange={(e) => setUserRating(parseInt(e.target.value))} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="review">
        <Form.Label>Review (optional)</Form.Label>
        <Form.Control as="textarea"   rows={3} onChange={(e) => setUserReview(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleFormSubmit}>
        Submit
      </Button>
    </Form>

    <h2>Reviews</h2>
    {ratingList.map((item, index) => (
        //stack shows all allergies
        <Stack
            key={index}
            direction="horizontal"
            gap={3}
            className="mb-2 p-2 border rounded"

        ><div>
          <div className="p-2">Name: {item.name}</div>
          <div className="p-2">Rating: {item.rating}</div>
          <div className="p-2">Review: {item.review}</div>


        </div>



        </Stack>
    ))}
  </div>;
}

export default CreateReview;
