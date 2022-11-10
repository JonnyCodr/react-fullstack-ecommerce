import { Rating } from 'react-simple-star-rating'
import Form from 'react-bootstrap/Form'
import {Fragment} from "react";

const RatingFilterComponent = () => {
  return (
   <>
    <span className="fw-bod">Rating</span>
     {
       Array.from({length: 5}).map((_, i) => (
         <Fragment key={i}>
           <Form.Check type='checkbox' id={`check-api-${i}`}>
             <Form.Check.Input type='checkbox' isValid />
             <Form.Check.Label style={{ cursor: 'pointer'}}>
               <Rating readonly size={20} initialValue={5 - i}/>
             </Form.Check.Label>
           </Form.Check>
         </Fragment>
       ))
     }
   </>
  );
};

export default RatingFilterComponent;
