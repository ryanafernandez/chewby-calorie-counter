import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_LOGGED_DAY } from '../../utils/queries';

import Auth from '../../utils/auth';

const EntryLog = ({ loggedDay }) => {
   
    
    // const { loading, error, data } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
    //     variables: { loggedDay, loggedDayAuthor }
    // });
    // const userData = data?.me;

    // console.log(userData);

    return (
        <>
            <p>Need to query for {loggedDay}</p>
        </>
    );
};

export default EntryLog;