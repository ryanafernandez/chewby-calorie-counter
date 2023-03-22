import React from 'react';
import { Progress } from 'semantic-ui-react';


const CalorieBar = (props) => {

    let overLimit = false;
    let targetPercentage = 100*props.calorieIntake/props.calorieTarget;

    if (targetPercentage > 110) {
        overLimit = true;
    }

    return (
        <div className="calorie-bar">

            <h4 id="calorie-bar-header">{props.calorieIntake}/{props.calorieTarget}</h4>

            { (overLimit)
                ? <Progress percent={targetPercentage} color='red'/>
                : <Progress percent={targetPercentage} indicating/>
            }

            { (overLimit)
                ? <p id="calorie-bar-target">You are {props.calorieIntake - props.calorieTarget} calories over your target goal.</p>
                : <p id="calorie-bar-target">You are {props.calorieTarget - props.calorieIntake} calories away from your daily target.</p>
            }

            
            
            
            
        </div>
    )
};


export default CalorieBar;