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

    const dailyTotals = {
        carbs: 0,
        protein: 0,
        fat: 0,
        calories: 0
    };

    const breakfastTotals = {
        carbs: 0,
        protein: 0,
        fat: 0,
        calories: 0
    };

    const lunchTotals = {
        carbs: 0,
        protein: 0,
        fat: 0,
        calories: 0
    };

    const dinnerTotals = {
        carbs: 0,
        protein: 0,
        fat: 0,
        calories: 0
    };

    breakfast.forEach(entry => {
        breakfastTotals.carbs += entry.carbs;
        breakfastTotals.protein += entry.protein;
        breakfastTotals.fat += entry.fat;
        breakfastTotals.calories += entry.calories;
    });

    lunch.forEach(entry => {
        lunchTotals.carbs += entry.carbs;
        lunchTotals.protein += entry.protein;
        lunchTotals.fat += entry.fat;
        lunchTotals.calories += entry.calories;
    });

    dinner.forEach(entry => {
        dinnerTotals.carbs += entry.carbs;
        dinnerTotals.protein += entry.protein;
        dinnerTotals.fat += entry.fat;
        dinnerTotals.calories += entry.calories;
    });

    dailyTotals.carbs = breakfastTotals.carbs + lunchTotals.carbs + dinnerTotals.carbs;
    dailyTotals.fat = breakfastTotals.fat + lunchTotals.fat + dinnerTotals.fat;
    dailyTotals.protein = breakfastTotals.protein + lunchTotals.protein + dinnerTotals.protein;
    dailyTotals.calories = breakfastTotals.calories + lunchTotals.calories + dinnerTotals.calories;

    return (
        <div className='content-container food-log'>
            <div className='controls-and-totals'>
                <div className='day-controls'>
                    <button onClick={viewPrev}>Prev</button>
                    <p>{ day }</p>
                    <button onClick={viewNext}>Next</button>
                </div>

                <div className="log-totals">
                    <div className="log-totals-stat">
                        <p className="totals-macro">{dailyTotals.carbs}g</p>
                        <p className="totals-label">Carbs</p>
                    </div>

                    <div className="log-totals-stat">
                        <p className="totals-macro">{dailyTotals.fat}g</p>
                        <p className="totals-label">Fat</p>
                    </div>

                    <div className="log-totals-stat">
                        <p className="totals-macro">{dailyTotals.protein}g</p>
                        <p className="totals-label">Protein</p>
                    </div>
                    
                    <div className="log-totals-stat">
                        <p className="totals-cals">{dailyTotals.calories}</p>
                        <p className="totals-label">Calories</p>
                    </div>
                </div>
            </div>

            <EntryTable 
                title='Breakfast' 
                data={breakfast}
                totals={breakfastTotals}
                addModalControl={() => showAddModal('Breakfast')}
            />
            <EntryTable 
                title='Lunch' 
                data={lunch}
                totals={lunchTotals} 
                addModalControl={() => showAddModal('Lunch')}
            />
            <EntryTable 
                title='Dinner' 
                data={dinner}
                totals={dinnerTotals} 
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