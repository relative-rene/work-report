import React, { useState } from 'react';


function CalculateCalories() {
    const [caloriesEaten, setFoodCalories] = useState([]);

    async function getCalories(food) {
        const encodedUrl = encodeURI(food);
        // const response = await fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${encodedUrl}`, {
        //     headers: {
        //         'X-RapidAPI-Key': 'ced4f6f9f0msha8f314713551f14p19458djsn8104eddff51a',
        //         'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        //     },

        // });
        // const data = await response.json();
        // console.log(data, 'food', food);
        // setFoodCalories(data);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        getCalories(e.target[0].value);
    }
    return (
        <>
            <form action="GET" onSubmit={handleSubmit}>
                <label htmlFor="">What did you eat?</label>
                <input type="text" />
                <button type="submit">Submit</button>
                <button type="reset">Clear</button>
            </form>
            <h1>{caloriesEaten}</h1>
        </>
    )
}

export default CalculateCalories;