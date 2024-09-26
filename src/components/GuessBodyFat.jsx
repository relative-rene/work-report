import { useState } from 'react';

import femaleBFComparison from "../assets/images/femaleBFComparison.jpeg";
import maleBFComparison from "../assets/images/maleBFComparison.jpeg";

const GuessBodyFat = () => {
    const [showingMale, setShow] = useState(true);
    return (
        <>
            <h3>Which range do you most resemble?</h3>
            <span className="moreOrLess" onClick={() => setShow(!showingMale)}>{showingMale ? "See Female" : "See Male"}</span><br />
            { showingMale ? 
                <img width="100%" height="100%" src={maleBFComparison} alt="male comparison" /> :
                <img width="100%" height="100%" src={femaleBFComparison} alt="female comparison" />
            }
        </>
    )
}



export default GuessBodyFat;