import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_LOGGED_DAY } from '../../utils/queries';
import dateFormat from '../../utils/dateFormat';
import loggedDayFormat from '../../utils/loggedDayFormat';
import Auth from '../../utils/auth';

const EntryLog = ({ viewedDay }) => {
    let formattedDay = dateFormat(viewedDay, { dayLength: '', monthLength: '', dateSuffix: true });
    let loggedDay = loggedDayFormat(viewedDay);
    let loggedDayAuthor = Auth.getProfile().data.username;

    console.log(loggedDay);
    console.log(loggedDayAuthor);
    
    const { loading, error, data } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
        variables: { loggedDay, loggedDayAuthor }
    });
    const userData = data?.me;

    console.log(userData);

    return (
        <>
            <h4>{loggedDay}</h4>
        </>
    );
};

export default EntryLog;