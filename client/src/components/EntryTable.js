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
                <p>{props.title}</p>
                <div className="macros">
                    <p>Carbs</p>
                    <p>Fat</p>
                    <p>Protein</p>
                </div>
                <p>Cals</p>
            </div>
            { (!props.data || (props.data.length < 1)) ?
                <>
                </>
                :
                <>
                    {props.data.map((entry) => (
                        <div className="table-entry">
                            <p>{entry.name}</p>
                            <div className="macros">
                                <p>{entry.carbs}</p>
                                <p>{entry.fat}</p>
                                <p>{entry.protein}</p>
                            </div>
                            <p>{entry.calories}</p>
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