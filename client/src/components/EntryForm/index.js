import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ENTRY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const EntryFrom = (loggedDay) => {
    const [formState, setFormState] = useState({
        item: '',
        calories: 0,
        loggedDay: loggedDay.loggedDay,
        loggedDayAuthor: Auth.getProfile().data.username,
    });

    const [addEntry, { error, data }] = useMutation(ADD_ENTRY);

    const handleAddEntry = async (event) => {
        event.preventDefault();
        
        // need to check if the day is logged
        // if not, then call ADD_DAY
        // else, continue

        try {
            console.log({...formState});
            const { data } = await addEntry({
                variables: { ...formState },
            });

            setFormState({ ...formState,
                item: '',
                calories: 0,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'item') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'calories') {
            setFormState({ ...formState, [name]: Number(value) });
        }
    };

    return (
        <div>
            <input
                name="item"
                placeholder="Enter an item to add"
                value={formState.item}
                onChange={handleChange}
            />
            <input
                type="number"
                name="calories"
                placeholder="Enter calories for this item"
                value={formState.calories}
                onChange={handleChange}
            />
            <button onClick={handleAddEntry}>
                Add Entry
            </button>
        </div>
    );
};

export default EntryFrom;