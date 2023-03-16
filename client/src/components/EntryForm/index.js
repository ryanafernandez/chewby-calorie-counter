import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ENTRY } from '../../utils/mutations';

import Auth from '../../utils/auth';

// EntryForm not from
const EntryForm = (props) => {
    const [formState, setFormState] = useState({
        item: '',
        calories: 0,
        loggedDayAuthor: Auth.getProfile().data.username,
    });

    console.log("EntryForm - formState:", formState);
    console.log("EntryForm - loggedDay", props.loggedDay);

    const [addEntry, { error, data }] = useMutation(ADD_ENTRY);

    const handleAddEntry = async (event) => {
        event.preventDefault();

        try {
            console.log("EntryForm - addEntry:", {...formState});
            const { data } = await addEntry({
                variables: { ...formState, loggedDay: props.loggedDay },
            });

            setFormState({ ...formState,
                item: '',
                calories: 0,
            });

            /// props.onSubmit();
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

export default EntryForm;