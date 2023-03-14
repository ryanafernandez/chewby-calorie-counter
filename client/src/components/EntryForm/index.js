import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ENTRY } from '../../utils/mutations';

const EntryFrom = () => {
    const [formState, setFormState] = useState({
        item: '',
        calories: 0,
        loggedDayId: "640ab0b0a3a80be21247c475",
    });

    const [addEntry, { error, data }] = useMutation(ADD_ENTRY);

    const handleAddEntry = async (event) => {
        event.preventDefault();
        
        try {
            console.log({...formState});
            const { data } = await addEntry({
                variables: { ...formState },
            });

            setFormState({
                item: '',
                calories: 0,
            });
        } catch (err) {
            console.log('help');
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