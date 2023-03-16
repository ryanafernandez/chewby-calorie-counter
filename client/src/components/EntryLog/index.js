import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_LOGGED_DAY } from '../../utils/queries';
import { REMOVE_ENTRY } from '../../utils/mutations'

import Auth from '../../utils/auth';

// Option 1 if you wanna pass around props
// const EntryContent = () => {
//     const [entries, setEntries] = Reacct.useState({})
//     return(
//         <div>
//             <EntirLog entries={entries}></EntirLog>
//             <EntryForm setEntries={setEntries} entries={entries}></EntryForm>
//         </div>
//     )
// }

// Option 2: refetching for new data
// const EntryContent = () => {
    // const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
    //     variables: { 
    //         loggedDay: loggedDay, 
    //         loggedDayAuthor: Auth.getProfile().data.username 
    //     }
    // });
//     return(
//         <div>
//             <EntirLog loggedDayData={data.loggedDay}></EntirLog>
//             <EntryForm onSubmit={refetch} ></EntryForm>
//         </div>
//     )
// }


const EntryLog = ({ loggedDay }) => {
   
    const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
        variables: { 
            loggedDay: loggedDay, 
            loggedDayAuthor: Auth.getProfile().data.username 
        },
        pollInterval: 500,
    });

    const [removeEntry, { removeError, removeData }] = useMutation(REMOVE_ENTRY);

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

    const handleRemoveEntry = async (entryId) => {

        try {
            const { data } = await removeEntry({ 
                variables: { 
                    entryId: entryId,
                    loggedDayId: loggedDayData._id
                },
            });
            console.log("delete id:", entryId);
        } catch (err) {
            console.error(err);
        }
        
    };

    console.log("EntryLog - Displaying entry log for:", loggedDay);
    // Otherwise, return current entries.
    return (
        <>
            {loggedDayData.entries.map((entry) => (
                <div entryid={entry._id}>
                    <p>{entry.item}</p>
                    <p>{entry.calories}</p>
                    <button onClick={e=> { e.preventDefault(); handleRemoveEntry(entry._id)}}>Delete</button>
                </div>
            ))}
        </>
    );
};

export default EntryLog;