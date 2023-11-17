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
        const data = await getMealReviews(meal_name);
        setRatingList(data);
        console.log(data);

      } catch (err) {
        console.log(err.message || "An error occurred while fetching Allergies.");
      }
    };

    fetchRatings()


  }, []);


  const location = useLocation();
  const {email, firstName, lastName, meal_name } = location.state || {};


  const [userRating, setUserRating] = useState(null);
  const [UserReview, setUserReview] = useState('');
  const [ratingList, setRatingList] = useState([]);




  const handleFormSubmit = () => {

    const name = firstName + ' ' + lastName;
    const ratingExists = ratingList.some((user) => user.name === name);

    try {
      if(userRating > 5 || userRating < 0){
        alert("rating must be between 0 and 5")
      }
      else if(ratingExists){
        alert("One rating per user")
      }
      else if(userRating !== '' && UserReview !== '') {
        newRating(userRating, UserReview, email, meal_name).then(r => console.log(r));
        setRatingList([...ratingList, { rating: userRating, review: UserReview, name: firstName + ' ' + lastName }]);
      }
      else if (userRating !== '') {
       newRating(userRating, email, meal_name).then(r => console.log(r));
        setRatingList([...ratingList, { rating: userRating, review: 'undefined', name: firstName + ' ' + lastName }]);
      }
    }
    catch (err) {
      console.log(err.message || "An error occurred while adding a Review.");
    }

  };

  return <div>
    <h1>Reviews for {meal_name}</h1>
    <Form>
      <Form.Label><h4>New Rating</h4></Form.Label>
      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control placeholder="0-5" onChange={(e) => setUserRating(parseInt(e.target.value))} />
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
          <div className="p-2">
            {(item.review !== null)  && (
                <React.Fragment>
                  Review: {item.review}
                </React.Fragment>
            )}
          </div>


        </div>



        </Stack>
    ))}
  </div>;
}

export default CreateReview;
