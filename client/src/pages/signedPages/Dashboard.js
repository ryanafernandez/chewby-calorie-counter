import React from 'react';
import { useHomeContext } from '../../utils/HomeContext';
import loggedDayFormat from '../../utils/loggedDayFormat';

const Dashboard = () => {
    const [state, dispatch] = useHomeContext();
    const { viewedDay } = state;
    
    let day = loggedDayFormat(viewedDay, true);
    
    return (
        <>
            <p>
                Today is {day}.
            </p>
        </>
    )
}

export default Dashboard;