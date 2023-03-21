import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Input, Button } from 'semantic-ui-react';

import { UPDATE_ENTRY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const UpdateForm = (props) => {
    const [formState, setFormState] = useState({
        entryId: props.entryId,
        item: props.item,
        calories: props.calories
    });

    const [updateEntry, { error, data }] = useMutation(UPDATE_ENTRY);

    const handleUpdateEntry = async (event) => {
        event.preventDefault();

        try {

            if (!formState.item.length) {
                console.error("Please enter an item");
                return;
            }
            console.log(formState);
            const { data } = await updateEntry({
                variables: { ...formState },
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
                value={formState.calories}
                onChange={handleChange}
            />
            <Button color='green' onClick={handleUpdateEntry}>
                Update Entry
            </Button>
        </>
    );
};

export default UpdateForm;