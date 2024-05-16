import { useState } from 'react';

import femaleBFComparison from "../assets/femaleBFComparison.jpeg";
import maleBFComparison from "../assets/maleBFComparison.jpeg";

const GuessBodyFat = () => {
    const [showingMale, setShow]= useState(true);
    return (
        <>
            <h3>Which range do you most resemble?</h3>
            <span className="moreOrLess" onClick={()=> setShow(!showingMale)}>{showingMale? "See Female":"See Male"}</span><br/>
            {showingMale?<img width="100%" height="100%" src={maleBFComparison} alt="male comparison image" />:
            <img width="100%" height="100%" src={femaleBFComparison} alt="female comparison image" />}
        </>
    )
}



export default GuessBodyFat;