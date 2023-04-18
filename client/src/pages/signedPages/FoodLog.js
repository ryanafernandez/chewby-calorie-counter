import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import EntryTable from '../../components/EntryTable';

import { useHomeContext } from '../../utils/HomeContext';
import loggedDayFormat from '../../utils/loggedDayFormat';
import { QUERY_SINGLE_DAY_LOG } from '../../utils/queries';
import Auth from '../../utils/auth';

const FoodLog = () => {
    const { viewedDay, viewPrev, viewNext } = useHomeContext();
    let day = loggedDayFormat(viewedDay, true);
    let breakfast = [];
    let lunch = [];
    let dinner = [];

    const { loading, error, data } = useQuery(QUERY_SINGLE_DAY_LOG, {
        variables: {
            day: day,
            userId: Auth.getProfile().data._id
        }
    });

    if (loading) return 'Loading...';
    if (error) console.log(error);

    const dayLog = data?.dayLog;
    if (dayLog) {
        breakfast = dayLog.breakfast;
        lunch = dayLog.lunch;
        dinner = dayLog.dinner;
    }

    return (
        <>
            <button onClick={viewPrev}>Prev</button>
            <p>{ day }</p>
            <button onClick={viewNext}>Next</button>
            <EntryTable title='Breakfast' data={breakfast}/>
            <EntryTable title='Lunch' data={lunch}/>
            <EntryTable title='Dinner' data={dinner}/>
        </>
    )
}

export default FoodLog;