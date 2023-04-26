import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import EntryTable from '../../components/EntryTable';
import EntryForm from '../../components/EntryForm';

import { useHomeContext } from '../../utils/HomeContext';
import loggedDayFormat from '../../utils/loggedDayFormat';
import { QUERY_SINGLE_DAY_LOG } from '../../utils/queries';
import Auth from '../../utils/auth';
import { 
    VIEW_NEXT,
    VIEW_PREV,
    UPDATE_MEALS 
} from '../../utils/actions';
import { Modal } from 'react-bootstrap';

const FoodLog = () => {
    const [state, dispatch] = useHomeContext();
    const { viewedDay, breakfast, lunch, dinner } = state;
    let day = loggedDayFormat(viewedDay, true);

    // Modal states
    const [ showEntryForm, setShowEntryForm ] = useState(false);
    const [ formCategory, setFormCategory ] = useState('Breakfast');

    const { loading, error, data } = useQuery(QUERY_SINGLE_DAY_LOG, {
        variables: {
            day: day,
            userId: Auth.getProfile().data._id
        }
    });

    useEffect(() =>{
        if (loading) return 'Loading...';
        if (error) console.log(error);
        if (data.dayLog) {
            dispatch({
                type: UPDATE_MEALS,
                breakfast: data.dayLog.breakfast,
                lunch: data.dayLog.lunch,
                dinner: data.dayLog.dinner,
            });
        } else {
            dispatch({
                type: UPDATE_MEALS,
                breakfast: [],
                lunch: [],
                dinner: [],
            })
        }
    }, [data, loading, dispatch]);

    const viewPrev = () => {
        const prev = new Date(viewedDay);
        prev.setDate(viewedDay.getDate() - 1);
        dispatch({
            type: VIEW_PREV,
            viewedDay: prev,
        });
    };

    const viewNext = () => {
        const next = new Date(viewedDay);
        next.setDate(viewedDay.getDate() + 1);
        dispatch({
            type: VIEW_NEXT,
            viewedDay: next,
        });
    };

    function showModal(meal) {
        setFormCategory(meal);
        setShowEntryForm(true);
    };

    return (
        <>
            <button onClick={viewPrev}>Prev</button>
            <p>{ day }</p>
            <button onClick={viewNext}>Next</button>
            <EntryTable title='Breakfast' data={breakfast} modalControl={() => showModal('Breakfast')}/>
            <EntryTable title='Lunch' data={lunch} modalControl={() => showModal('Lunch')} />
            <EntryTable title='Dinner' data={dinner} modalControl={() => showModal('Dinner')}/>

            <Modal
                size='lg'
                show={showEntryForm}
                onHide={() => setShowEntryForm(false)}
                aria-labelledby='entryform-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='entryform-modal'>
                        Add a New Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EntryForm day={day} formCategory={formCategory} handleModalClose={() => setShowEntryForm(false)} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FoodLog;