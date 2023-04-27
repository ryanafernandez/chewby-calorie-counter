import React from 'react';
import { useMutation } from '@apollo/client';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { useHomeContext } from '../utils/HomeContext';
import { REMOVE_BREAKFAST, REMOVE_LUNCH, REMOVE_DINNER } from '../utils/mutations';

const EntryTable = (props) => {

    const [state, dispatch] = useHomeContext();
    const { dayLogId } = state;

    const [removeBreakfast] = useMutation(REMOVE_BREAKFAST);
    const [removeLunch] = useMutation(REMOVE_LUNCH);
    const [removeDinner] = useMutation(REMOVE_DINNER);

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

            // setEdit(false);
        } catch (err) {
            console.error(err);
        }
        
    };  
    
    return (
        // <CompactTable key={props.data.id} columns={COLUMNS} data={data} theme={theme}/>
        <div className="entry-table">
            <div className="table-header">
                <div className="edit-col">
                    <button>Edit</button>
                </div>
        
                <div className="name-col">
                    <p>{props.title}</p>
                </div>
                
                <div className="macros-col">
                    <div>
                        <p>Carbs (g)</p>
                    </div>

                    <div>
                        <p>Fat (g)</p>
                    </div>
                    
                    <div>
                        <p>Protein (g)</p>
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
                                <button>Edit</button>
                                <button onClick={e=> { e.preventDefault(); handleRemoveEntry(props.title, entry._id)}}>Delete</button>
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
            <div className="add-entry">
                <button onClick={props.modalControl}>Add Entry</button>
            </div>
        </div>
    );
};

export default EntryTable;