import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import EntryTable from '../../components/EntryTable';
import EntryForm from '../../components/EntryForm';
import UpdateForm from '../../components/UpdateForm';

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
    const { viewedDay, dayLogId, breakfast, lunch, dinner } = state;
    let day = loggedDayFormat(viewedDay, true);

    // Modal states
    const [ showEntryForm, setShowEntryForm ] = useState(false);
    const [ showUpdateForm, setShowUpdateForm ] = useState(false);
    const [ formCategory, setFormCategory ] = useState('');

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
                dayLogId: data.dayLog._id,
                breakfast: data.dayLog.breakfast,
                lunch: data.dayLog.lunch,
                dinner: data.dayLog.dinner,
            });
        } else {
            dispatch({
                type: UPDATE_MEALS,
                dayLogId: '',
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

    function showAddModal(meal) {
        setFormCategory(meal);
        setShowEntryForm(true);
    };

    const showUpdateModal = (meal) => {
        setFormCategory(meal);
        setShowUpdateForm(true);
        console.log(meal);
    };

    return (
        <div className='content-container food-log'>
            <div className='day-controls'>
                <button onClick={viewPrev}>Prev</button>
                <p>{ day }</p>
                <button onClick={viewNext}>Next</button>
            </div>
            
            <EntryTable 
                title='Breakfast' 
                data={breakfast}
                addModalControl={() => showAddModal('Breakfast')}
            />
            <EntryTable 
                title='Lunch' 
                data={lunch} 
                addModalControl={() => showAddModal('Lunch')}
            />
            <EntryTable 
                title='Dinner' 
                data={dinner} 
                addModalControl={() => showAddModal('Dinner')}
            />

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

            
        </div>
    )
}

export default FoodLog;