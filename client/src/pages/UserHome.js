import React from 'react';
import { useQuery } from '@apollo/client';

import EntryLog from '../components/EntryLog';
import EntryForm from '../components/EntryForm';

import { GET_ME } from '../utils/queries';

const UserHome = () => {

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me;

    if (error) return `Error! ${error.message}`;
    if (loading) return 'Loading...';

    let today = new Date();
    
    return (
        <div>
            <h2>Hello {userData.username}</h2>
            <p>_id: {userData._id}</p>
            <p>email: {userData.email}</p>
            <div>
                <EntryLog viewedDay={today} />
            </div>
            <div>
                <EntryForm />
            </div>
        </div>
    );
};

export default UserHome;