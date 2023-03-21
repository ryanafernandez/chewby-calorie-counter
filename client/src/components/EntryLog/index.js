import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import { Button, Icon, Table } from 'semantic-ui-react'

import CalorieBar from '../CalorieBar';
import EntryForm from '../EntryForm';

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


const EntryLog = (props) => {
   
    const [ edit, setEdit ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const { loading, error, data } = useQuery(QUERY_SINGLE_LOGGED_DAY, {
        variables: { 
            loggedDay: props.loggedDay, 
            loggedDayAuthor: Auth.getProfile().data.username 
        },
        pollInterval: 500,
    });
    const [removeEntry, { removeError, removeData }] = useMutation(REMOVE_ENTRY);

    const calorieTarget = 2000;
    let calorieIntake = 0;

    if (loading) return 'Loading...';
    if (error) return console.error(error);

    const loggedDayData = data?.loggedDay;

    if (loggedDayData) {
        loggedDayData.entries.forEach(entry => {
            calorieIntake += entry.calories;
        });
    };

    const handleRemoveEntry = async (entryId) => {
        try {
            const { data } = await removeEntry({ 
                variables: { 
                    entryId: entryId,
                    loggedDayId: loggedDayData._id
                },
            });
            setEdit(false);
        } catch (err) {
            console.error(err);
        }
        
    };
    
    return (
        <div>
            <CalorieBar calorieIntake={calorieIntake} calorieTarget={calorieTarget} />
            
            { (!loggedDayData || (loggedDayData.entries.length < 1)) ?
                <p> You haven't made any entries for {props.loggedDay} yet. </p>
                :
                <>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Item</Table.HeaderCell>
                                <Table.HeaderCell>Calories</Table.HeaderCell>
                                { (edit) ? 
                                    <Table.HeaderCell></Table.HeaderCell>
                                    : console.log('okay')
                                }
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {loggedDayData.entries.map((entry) => (
                                <Table.Row>
                                    <Table.Cell>{entry.item}</Table.Cell>
                                    <Table.Cell>{entry.calories}</Table.Cell>
                                    { (edit) ?
                                        <Table.Cell>
                                            <Button 
                                                icon
                                                color='red'
                                                onClick={e=> { e.preventDefault(); handleRemoveEntry(entry._id)}}
                                            >
                                                <Icon name='delete' />
                                            </Button>
                                        </Table.Cell>
                                        : console.log('okay')
                                    }
                                </Table.Row> 
                            ))}
                        </Table.Body>
                    </Table>
                    <Button onClick={() => setEdit(!edit)}>
                        Remove entry
                    </Button>
                </>
            }
            
            <Button color='green' onClick={() => setShowModal(true)}>
                Add an entry
            </Button>
            
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='entryform-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='entryform-modal'>
                        Add a New Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EntryForm loggedDay={props.loggedDay} handleModalClose={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>           
        </div>
    );
};

export default EntryLog;