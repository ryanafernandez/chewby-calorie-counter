import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import EntryLog from '../components/EntryLog';
import EntryForm from '../components/EntryForm';

import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import dateFormat from '../utils/dateFormat';
import loggedDayFormat from '../utils/loggedDayFormat';

import { ButtonAnimatedLeft, ButtonAnimatedRight } from '../utils/buttonAnimated';

const UserHome = () => {
    
    // create state for holding the viewed date
    const [viewedDay, setViewedDay] = useState(new Date());

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me;

    if (error) return `Error! ${error.message}`;
    if (loading) return 'Loading...';

    var today = new Date();
    const prev = new Date(viewedDay);
    prev.setDate(viewedDay.getDate() - 1);
    const prevDay = loggedDayFormat(prev, true);
    const prevShort = loggedDayFormat(prev, false);

    const next = new Date(viewedDay);
    next.setDate(viewedDay.getDate() + 1);
    const nextDay = loggedDayFormat(next, true);
    const nextShort = loggedDayFormat(next, false);

    // nice formatted day for user home
    let formattedDay = dateFormat(viewedDay, { dayLength: '', monthLength: '', dateSuffix: true });

    // formatted loggedDay for backend ( mm/dd/yyyy )
    let loggedDay = loggedDayFormat(viewedDay, true); // 03/13/2023

    const handlePrev = async (event) => {
        event.preventDefault();

        // for reference: https://stackoverflow.com/questions/71507861/react-js-not-refreshing-state-update-with-date-value
        const prev = new Date(viewedDay);
        prev.setDate(viewedDay.getDate() - 1);
        setViewedDay(prev);
    };

    const handleNext = async (event) => {
        event.preventDefault();

        const next = new Date(viewedDay);
        next.setDate(viewedDay.getDate() + 1);
        setViewedDay(next);
    }

    return (
        <div className="flex-column-center">
            <div className="flex-column-center userhome">
                <h2>Hello {Auth.getProfile().data.username}</h2>
                <div className="flex-row-center date-select">
                    <ButtonAnimatedLeft handlePrev={handlePrev} prev={prevShort}/>
                    <h2>{formattedDay}</h2>
                    <ButtonAnimatedRight handleNext={handleNext} next={nextShort}/>
                </div>
                <div>
                    <EntryLog loggedDay={loggedDay} />
                </div>
            </div>
        </div>
    );
};

export default UserHome;