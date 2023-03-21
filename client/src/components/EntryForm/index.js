import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Input, Button } from 'semantic-ui-react';

import { ADD_ENTRY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const EntryForm = (props) => {
    const [formState, setFormState] = useState({
        item: '',
        calories: 0,
        loggedDayAuthor: Auth.getProfile().data.username,
    });

    const [addEntry, { error, data }] = useMutation(ADD_ENTRY);

    const handleAddEntry = async (event) => {
        event.preventDefault();

        try {

            if (!formState.item.length) {
                console.error("Please enter an item");
                return;
            }

            const { data } = await addEntry({
                variables: { ...formState, loggedDay: props.loggedDay },
            });

            setFormState({ ...formState,
                item: '',
                calories: 0,
            });

            props.handleModalClose();
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
        <>
            <Input 
                label="Item"
                name="item"
                placeholder="Item name"
                value={formState.item}
                onChange={handleChange} 
            />
            <Input
                label="Calories"
                type="number"
                name="calories"
                placeholder="0"
                onChange={handleChange}
            />
            <Button color='green' onClick={handleAddEntry}>
                Add Entry
            </Button>
        </>
    );
};

export default EntryForm;