import React from 'react';
import { useHomeContext } from '../../utils/HomeContext';
import loggedDayFormat from '../../utils/loggedDayFormat';

const FoodLog = () => {
    const { viewedDay, viewPrev, viewNext } = useHomeContext();
    let day = loggedDayFormat(viewedDay, true);

    return (
        <>
            <button onClick={viewPrev}>Prev</button>
            <p>{ day }</p>
            <button onClick={viewNext}>Next</button>
        </>
    )
}

export default FoodLog;