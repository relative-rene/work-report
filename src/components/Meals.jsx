import React, { useState } from 'react';
import CalculateCalories from './CalculateCalories';

const Breakfast = ["Eggs", "Bacon", "Cheese", "Cereal", "Oats", "Waffles", "Hashbrown Patty", "Pankcakes"];
const Lunch = ["Carnitas", "Flour Tortilla", "Beans", "Romaine"];
const Dinner = ["Beef Builgogi", "Chicken Teriaki", "Tri-tip", "tj Mac and Cheese", "Brocalli"];
const BoyLunch = ["Almond Butter Sandwich", "Rice rolls", "Chicken Potsticker", "Quesadilla", "Beef", "Noodle Soup", ""]

function MealPlanner() {

    return (
        <div className="MealPlanner">
            <CalculateCalories />
        </div>
    )
}

export default MealPlanner;
