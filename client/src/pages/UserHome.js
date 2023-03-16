import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import EntryLog from '../components/EntryLog';
import EntryForm from '../components/EntryForm';

import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import dateFormat from '../utils/dateFormat';
import loggedDayFormat from '../utils/loggedDayFormat';

const UserHome = () => {
    // create state for holding the viewed date
    const [viewedDay, setViewedDay] = useState(new Date());

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me;

    if (error) return `Error! ${error.message}`;
    if (loading) return 'Loading...';

    var today = new Date();

    // nice formatted day for user home
    let formattedDay = dateFormat(viewedDay, { dayLength: '', monthLength: '', dateSuffix: true });

    // formatted loggedDay for backend ( mm/dd/yyyy )
    let loggedDay = loggedDayFormat(viewedDay); // 03/13/2023
    console.log("loggedDay:", loggedDay);

    const handlePrev = async (event) => {
        event.preventDefault();

        // for reference: https://stackoverflow.com/questions/71507861/react-js-not-refreshing-state-update-with-date-value
        const prev = new Date(viewedDay);
        prev.setDate(viewedDay.getDate() - 1);
        console.log("prev", prev);
        setViewedDay(prev);
    };

    const handleNext = async (event) => {
        event.preventDefault();

        const next = new Date(viewedDay);
        next.setDate(viewedDay.getDate() + 1);
        console.log("next:", next);
        setViewedDay(next);
    }

    return (
        <div>
            <h2>Hello {Auth.getProfile().data.username}</h2>
            <p>_id: {userData._id}</p>
            <p>email: {userData.email}</p>
            <div>
                <button onClick={handlePrev}>Prev</button>
                <h2>{formattedDay}</h2>
                <button onClick={handleNext}>Next</button>
            </div>
            <div>
                <EntryLog loggedDay={loggedDay} />
            </div>
            <div>
                <EntryForm loggedDay={loggedDay}/>
            </div>
        </div>
    );
};

export default UserHome;