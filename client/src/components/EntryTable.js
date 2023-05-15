import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import UpdateForm from './UpdateForm';
import CarbIcon from '../images/bread-32.png';
import FatIcon from '../images/butter-32.png';
import ProteinIcon from '../images/chicken-32.png';
import EditIcon from '../images/edit-32.png';
import UpdateIcon from '../images/update-32.png';
import DeleteIcon from '../images/delete-32.png';
import AddIcon from '../images/add-32.png';

import { useHomeContext } from '../utils/HomeContext';
import { REMOVE_BREAKFAST, REMOVE_LUNCH, REMOVE_DINNER } from '../utils/mutations';

const EntryTable = (props) => {
    const [ edit, setEdit ] = useState(false);

    const [state, dispatch] = useHomeContext();
    const { dayLogId } = state;

    const [removeBreakfast] = useMutation(REMOVE_BREAKFAST);
    const [removeLunch] = useMutation(REMOVE_LUNCH);
    const [removeDinner] = useMutation(REMOVE_DINNER);

    const [ showUpdateForm, setShowUpdateForm ] = useState(false);
    const [ updateForm, setUpdateForm ] = useState({
        entryId: '',
        dayLogId: dayLogId,
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
    });

    const handleRemoveEntry = async (meal, entryId) => {
        try {
            switch (meal) {
                case 'Breakfast':
                    await removeBreakfast({
                        variables: {
                            entryId: entryId,
                            dayLogId: dayLogId
                        },
                    });
                    break;
                case 'Lunch':
                    await removeLunch({
                        variables: {
                            entryId: entryId,
                            dayLogId: dayLogId
                        },
                    });
                    break;
                case 'Dinner':
                    await removeDinner({
                        variables: {
                            entryId: entryId,
                            dayLogId: dayLogId
                        },
                    });
                    break;
            }

        } catch (err) {
            console.error(err);
        }
        
    };  

    

    const editButtonHandler = async () => {
        if (edit) {
            await setEdit(false);
            hideButtons();
        }
        else {
            await setEdit(true);
            showButtons();
        }
    };

    const showButtons = () => {
        const editButtons = document.querySelectorAll(`.edit-${props.title}`);
        editButtons.forEach(button => {
            button.hidden = false;
        })
    };

    const hideButtons = () => {
        const editButtons = document.querySelectorAll(`.edit-${props.title}`);
        editButtons.forEach(button => {
            button.hidden = true;
        })
    };

    return (
        // <CompactTable key={props.data.id} columns={COLUMNS} data={data} theme={theme}/>
        <div className="entry-table">
            <div className="table-header">
                <div className="edit-col">
                    <button
                        onClick={editButtonHandler}
                    >
                        <img src={EditIcon}/>
                    </button>
                </div>
        
                <div className="name-col">
                    <p>{props.title}</p>
                </div>
                
                <div className="macros-col">
                    <div>
                        <img src={CarbIcon}/>
                    </div>

                    <div>
                        <img src={FatIcon}/>
                    </div>
                    
                    <div>
                        <img src={ProteinIcon}/>
                    </div>
                </div>

                <div className="cals-col">
                    <p>Cals</p>
                </div>
            </div>
            { (!props.data || (props.data.length < 1)) ?
                <>
                </>
                :
                <>
                    {props.data.map((entry) => (
                        <div className="table-entry">
                            <div className="edit-col">
                                        <button 
                                            className={`edit-${props.title}`}
                                            onClick={e => { 
                                                        e.preventDefault();
                                                        setUpdateForm({
                                                            entryId: entry._id,
                                                            dayLogId: dayLogId,
                                                            name: entry.name,
                                                            calories: entry.calories,
                                                            protein: entry.protein,
                                                            fat: entry.fat,
                                                            carbs: entry.carbs
                                                        });
                                                        setShowUpdateForm(true);
                                                        editButtonHandler();

                                            }}
                                            hidden
                                        >
                                            <img src={UpdateIcon}/>
                                        </button>

                                        <button
                                            className={`edit-${props.title}`} 
                                            onClick={e=> { 
                                                e.preventDefault();
                                                handleRemoveEntry(props.title, entry._id);
                                                editButtonHandler();
                                            }}
                                            hidden
                                        >
                                            <img src={DeleteIcon}/>
                                        </button>              
                            </div>

                            <div className="name-col">
                                <p>{entry.name}</p>
                            </div>
                            
                            <div className="macros-col">
                                <div>
                                    <p>{entry.carbs}</p>
                                </div>

                                <div>
                                    <p>{entry.fat}</p>
                                </div>         

                                <div>
                                    <p>{entry.protein}</p>
                                </div>                       
                            </div>

                            <div className="cals-col">
                                <p>{entry.calories}</p>
                            </div>
                        </div>
                    ))}
                </>
            }
            <div className="table-entry">
                <div className="edit-col">
                    <button 
                        onClick={e=> {
                            e.preventDefault();
                            props.addModalControl();
                            editButtonHandler();
                        }}
                    >
                        <img src={AddIcon}/>
                    </button>
                </div>
                
                <div className="name-col">
                    Add an Entry
                </div>

                <div className="macros-col"/>
                <div className="cals-col"/>
            </div>

            <div className="table-entry">
                <div className="edit-col"></div>

                <div className="name-col">
                    TOTALS
                </div>

                <div className="macros-col">
                    <div>
                        <p>{props.totals.carbs}</p>
                    </div>

                    <div>
                        <p>{props.totals.fat}</p>
                    </div>         

                    <div>
                        <p>{props.totals.protein}</p>
                    </div>   
                </div>

                <div className="cals-col">
                    <p>{props.totals.calories}</p>
                </div>
            </div>
            <Modal
                size='lg'
                show={showUpdateForm}
                onHide={() => setShowUpdateForm(false)}
                aria-labelledby='updateform-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='updateform-modal'>
                        Update an Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm 
                        entryId={updateForm.entryId}
                        dayLogId={dayLogId}
                        name={updateForm.name}
                        calories={updateForm.calories}
                        protein={updateForm.protein}
                        fat={updateForm.fat}
                        carbs={updateForm.carbs}
                        formCategory={props.title}
                        handleModalClose={() => setShowUpdateForm(false)}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EntryTable;