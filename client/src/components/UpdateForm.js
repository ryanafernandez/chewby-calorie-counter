import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BREAKFAST, UPDATE_LUNCH, UPDATE_DINNER } from '../utils/mutations';

const UpdateForm = (props) => {
    const [formState, setFormState] = useState({
        entryId: props.entryId,
        dayLogId: props.dayLogId,
        name: props.name,
        calories: props.calories,
        protein: props.protein,
        fat: props.fat,
        carbs: props.carbs,
        category: props.formCategory
    });

    const [updateBreakfast] = useMutation(UPDATE_BREAKFAST);
    const [updateLunch] = useMutation(UPDATE_LUNCH);
    const [updateDinner] = useMutation(UPDATE_DINNER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'name') {
            setFormState({ ...formState, [name]: value });
        } else if (name === 'calories') {
            setFormState({ ...formState, [name]: parseInt(value) });
        } else if (name === 'protein') {
            setFormState({ ...formState, [name]: parseInt(value) });
        } else if (name === 'fat') {
            setFormState({ ...formState, [name]: parseInt(value) });
        } else if (name === 'carbs') {
            setFormState({ ...formState, [name]: parseInt(value) });
        } else if (name === 'category') {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleUpdateEntry = async (event) => {
        event.preventDefault();

        try {
            if (!formState.name.length) {
                console.error("Please enter a name");
                return;
            }

            switch(formState.category) {
                case 'Breakfast':
                    await updateBreakfast({
                        variables: {
                            entryId: formState.entryId,
                            dayLogId: formState.dayLogId,
                            name: formState.name,
                            calories: formState.calories,
                            carbs: formState.carbs,
                            protein: formState.protein,
                            fat: formState.fat
                        },
                    });
                    break;
                case 'Lunch':
                    await updateLunch({
                        variables: {
                            entryId: formState.entryId,
                            dayLogId: formState.dayLogId,
                            name: formState.name,
                            calories: formState.calories,
                            carbs: formState.carbs,
                            protein: formState.protein,
                            fat: formState.fat
                        },
                    });
                    break;
                case 'Dinner':
                    await updateDinner({
                        variables: {
                            entryId: formState.entryId,
                            dayLogId: formState.dayLogId,
                            name: formState.name,
                            calories: formState.calories,
                            carbs: formState.carbs,
                            protein: formState.protein,
                            fat: formState.fat
                        },
                    });
                    break;
                default:
                    console.log('Could not update entry');
                    break;
            }

            setFormState({ ...formState,
                entryId: '',
                name: '',
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0
            });

            props.handleModalClose();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="entry-form">
            <div className="form-item">
                <label for="name">Item name</label>
                <input 
                    name="name"
                    placeholder="Item name"
                    value={formState.name}
                    onChange={handleChange} 
                />
            </div>
            
            <div className="form-item">
                <label for="calories">Calories</label>
                <input
                    type="number"
                    name="calories"
                    placeholder="Calories"
                    value={formState.calories}
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <label for="carbs">Carbs (g)</label>
                <input
                    type="number"
                    name="carbs"
                    placeholder="Carbs"
                    value={formState.carbs}
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <label for="fat">Fat (g)</label>
                <input
                    type="number"
                    name="fat"
                    placeholder="Fat"
                    value={formState.fat}
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <label for="protein">Protein (g)</label>
                <input
                    type="number"
                    name="protein"
                    placeholder="Protein"
                    value={formState.protein}
                    onChange={handleChange}
                />
            </div>

            <div className="form-item">
                <label for="category">Category</label>
                <select
                    name="category"
                    onChange={handleChange}
                    value={props.formCategory}
                >
                    <option value={props.formCategory}>{props.formCategory}</option>
                </select>
            </div>
            
            <button onClick={handleUpdateEntry}>
                Update Entry
            </button>
        </div>
    )
};

export default UpdateForm;