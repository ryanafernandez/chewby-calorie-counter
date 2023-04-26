import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_BREAKFAST, ADD_LUNCH, ADD_DINNER } from '../utils/mutations';
import Auth from '../utils/auth';

const EntryForm = (props) => {
    const [formState, setFormState] = useState({
        day: props.day,
        userId: Auth.getProfile().data._id,
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        category: props.formCategory,
    });

    const [addBreakfast] = useMutation(ADD_BREAKFAST);
    const [addLunch] = useMutation(ADD_LUNCH);
    const [addDinner] = useMutation(ADD_DINNER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'name') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'calories') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'protein') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'fat') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'carbs') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'category') {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleAddEntry = async (event) => {
        event.preventDefault();

        try {
            if (!formState.name.length) {
                console.error("Please enter a name");
                return;
            }
            
            switch(formState.category) {
                case 'Breakfast':
                    await addBreakfast({
                        variables: {
                            day: formState.day,
                            userId: formState.userId,
                            foodId: "643ec6d1e481dd6fd663fa13"
                        },
                    });
                    break;
                case 'Lunch':
                    await addLunch({
                        variables: {
                            day: formState.day,
                            userId: formState.userId,
                            foodId: "643ec6d1e481dd6fd663fa13"
                        },
                    });
                    break;
                case 'Dinner':
                    await addDinner({
                        variables: {
                            day: formState.day,
                            userId: formState.userId,
                            foodId: "643ec6d1e481dd6fd663fa13"
                        },
                    });
                    break;
                default:
                    console.log('invalid');
                    break;
            }

            setFormState({ ...formState,
                name: '',
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0,
            });

           
            props.handleModalClose();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <input 
                label="Item"
                name="name"
                placeholder="Item name"
                value={formState.item}
                onChange={handleChange} 
            />
            <input
                label="Calories"
                type="number"
                name="calories"
                placeholder="Calories"
                onChange={handleChange}
            />
            <input
                label="Carbs"
                type="number"
                name="carbs"
                placeholder="Carbs"
                onChange={handleChange}
            />
            <input
                label="Fat"
                type="number"
                name="fat"
                placeholder="Fat"
                onChange={handleChange}
            />
            <input
                label="Protein"
                type="number"
                name="protein"
                placeholder="Protein"
                onChange={handleChange}
            />
            <select
                name="category"
                onChange={handleChange}
                value={props.formCategory}
            >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
            <button onClick={handleAddEntry}>
                Add Entry
            </button>
        </>
    )
}

export default EntryForm;