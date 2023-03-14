import React from 'react';
import { useQuery } from '@apollo/client';

import EntryLog from '../components/EntryLog';
import EntryForm from '../components/EntryForm';

import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import dateFormat from '../utils/dateFormat';
import loggedDayFormat from '../utils/loggedDayFormat';

const UserHome = () => {

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me;

    if (error) return `Error! ${error.message}`;
    if (loading) return 'Loading...';

    let today = new Date();
    // nice formatted day for user home
    let formattedDay = dateFormat(today, { dayLength: '', monthLength: '', dateSuffix: true });

    // formatted loggedDay for backend ( mm/dd/yyyy )
    let loggedDay = loggedDayFormat(today); // 03/13/2023

    console.log(formattedDay);
    console.log(loggedDay);

    return (
        <div>
            <h2>Hello {Auth.getProfile().data.username}</h2>
            <p>_id: {userData._id}</p>
            <p>email: {userData.email}</p>
            <div>
                <h2>{formattedDay}</h2>
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