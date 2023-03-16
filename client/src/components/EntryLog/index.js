import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_LOGGED_DAY } from '../../utils/queries';

import Auth from '../../utils/auth';

const EntryLog = ({ loggedDay }) => {
   
    const { loading, error, data } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
        variables: { 
            loggedDay: loggedDay, 
            loggedDayAuthor: Auth.getProfile().data.username 
        }
    });

    if (loading) return 'Loading...';
    if (error) return console.error(error);

    const loggedDayData = data?.loggedDay;

    // If no data logged for the day, say so.
    if (!loggedDayData || (loggedDayData.entries.length < 1)) {
        console.log("EntryLog - No logs found for:", loggedDay);
        return (
            <>
                <p> You haven't made any entries for {loggedDay} yet. </p>
            </>
        );
    }

    console.log("EntryLog - Displaying entry log for:", loggedDay);
    // Otherwise, return current entries.
    return (
        <>
            {loggedDayData.entries.map((entry) => (
                <div>
                    <p>{entry.item}</p>
                    <p>{entry.calories}</p>
                </div>
            ))}
        </>
    );
};

export default EntryLog;