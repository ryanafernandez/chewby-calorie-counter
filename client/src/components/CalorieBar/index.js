import React from 'react';

const CalorieBar = (props) => {

    let targetPercentage = 100*props.calorieIntake/props.calorieTarget;

    return (
        <div class="calorieMeter">
            <p>{props.calorieIntake}/{props.calorieTarget}</p>
            <div id="calorie-bar" style={{height: '30px', width: '300px', border: 'black 3px solid'}}>
                <div id="daily-intake" style={{ backgroundColor: "#8CC152", width: `${targetPercentage}%`, height: '100%'}}></div>
            </div>
        </div>
    )
};


export default CalorieBar;