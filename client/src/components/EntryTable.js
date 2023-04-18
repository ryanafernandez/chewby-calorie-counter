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
        <CompactTable key={props.data.id} columns={COLUMNS} data={data} theme={theme}/>
    );
};

export default EntryTable;