import React from 'react';
import dateFormat from '../../utils/dateFormat';

const EntryLog = ({ viewedDay }) => {
    let formattedDay = dateFormat(viewedDay, { dayLength: '', monthLength: '', dateSuffix: true });
    return (
        <>
            <h3>{formattedDay}</h3>
        </>
    );
};

export default EntryLog;