import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../utils/queries';

const UserHome = () => {

    const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me;

    if (error) return `Error! ${error.message}`;
    if (loading) return 'Loading...';

    return (
        <div>
            <h2>Hello {userData.username}</h2>
            <p>_id: {userData._id}</p>
            <p>email: {userData.email}</p>
        </div>
    );
};

export default UserHome;