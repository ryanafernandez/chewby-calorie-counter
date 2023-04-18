import React, { useState, createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_DAY_LOG } from './queries';
import Auth from './auth';
import loggedDayFormat from './loggedDayFormat';

const HomeContext = createContext();

export const useHomeContext = () => useContext(HomeContext);

export const HomeProvider = (props) => {
    const [viewedDay, setViewedDay] = useState(new Date());

    const viewPrev = () => {
        const prev = new Date(viewedDay);
        prev.setDate(viewedDay.getDate() - 1);
        setViewedDay(prev);
    };

    const viewNext = () => {
        const next = new Date(viewedDay);
        next.setDate(viewedDay.getDate() + 1);
        setViewedDay(next);
    };

    return (
        <HomeContext.Provider value={{ viewedDay, viewPrev, viewNext }} {...props} />
    );
};