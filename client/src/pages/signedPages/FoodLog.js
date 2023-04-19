import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import EntryTable from '../../components/EntryTable';

import { useHomeContext } from '../../utils/HomeContext';
import loggedDayFormat from '../../utils/loggedDayFormat';
import { QUERY_SINGLE_DAY_LOG } from '../../utils/queries';
import Auth from '../../utils/auth';
import { 
    VIEW_NEXT,
    VIEW_PREV,
    UPDATE_MEALS 
} from '../../utils/actions';

const FoodLog = () => {
    const [state, dispatch] = useHomeContext();
    const { viewedDay, breakfast, lunch, dinner } = state;
    let day = loggedDayFormat(viewedDay, true);

    const { loading, error, data } = useQuery(QUERY_SINGLE_DAY_LOG, {
        variables: {
            day: day,
            userId: Auth.getProfile().data._id
        }
    });

    useEffect(() =>{
        if (loading) return 'Loading...';
        if (error) console.log(error);
        if (data.dayLog) {
            dispatch({
                type: UPDATE_MEALS,
                breakfast: data.dayLog.breakfast,
                lunch: data.dayLog.lunch,
                dinner: data.dayLog.dinner,
            });
        } else {
            dispatch({
                type: UPDATE_MEALS,
                breakfast: [],
                lunch: [],
                dinner: [],
            })
        }
    }, [data, loading, dispatch]);

    const viewPrev = () => {
        const prev = new Date(viewedDay);
        prev.setDate(viewedDay.getDate() - 1);
        dispatch({
            type: VIEW_PREV,
            viewedDay: prev,
        });
    };

    const viewNext = () => {
        const next = new Date(viewedDay);
        next.setDate(viewedDay.getDate() + 1);
        dispatch({
            type: VIEW_NEXT,
            viewedDay: next,
        });
    };

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