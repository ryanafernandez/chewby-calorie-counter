import React from 'react';
import { Progress } from 'semantic-ui-react';


const CalorieBar = (props) => {

    let overLimit = false;
    let targetPercentage = 100*props.calorieIntake/props.calorieTarget;

    if (targetPercentage > 110) {
        overLimit = true;
    }

    return (
        <div class="calorieMeter">
            { (overLimit)
                ? <Progress percent={targetPercentage} color='red' />
                : <Progress percent={targetPercentage} indicating />
            }

            <p> 
                {props.calorieIntake}/{props.calorieTarget}
            </p>
        </div>
    )
};


export default CalorieBar;