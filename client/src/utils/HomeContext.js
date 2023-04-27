import React, { createContext, useContext } from 'react';

import { useHomeReducer } from './reducers';


const HomeContext = createContext();
const { Provider } = HomeContext;

const HomeProvider = ({ value = [], ...props}) => {

    const [state, dispatch] = useHomeReducer({
        userId: props.userId,
        viewedDay: new Date(),
        dayLogId: '',
        breakfast: [],
        lunch: [],
        dinner: [],
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useHomeContext = () => {
    return useContext(HomeContext);
};

export { HomeProvider, useHomeContext };