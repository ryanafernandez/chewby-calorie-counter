import React from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const EntryTable = (props) => {

    const data = { nodes: props.data };
    const theme = useTheme(getTheme());
    const COLUMNS = [
        { label: props.title, renderCell: (item) => item.name },
        { label: 'Carbs', renderCell: (item) => item.carbs },
        { label: 'Fat', renderCell: (item) => item.fat },
        { label: 'Protein', renderCell: (item) => item.protein },
        { label: 'Cals', renderCell: (item) => item.calories },
    ];

    
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
                                <button>Delete</button>
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