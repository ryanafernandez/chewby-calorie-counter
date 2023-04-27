import { useReducer } from 'react';

import {
    VIEW_NEXT,
    VIEW_PREV,
    UPDATE_MEALS
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case VIEW_NEXT:
            return {
                ...state,
                viewedDay: action.viewedDay
            };

        case VIEW_PREV:
            return {
                ...state,
                viewedDay: action.viewedDay
            };

        case UPDATE_MEALS:
            return {
                ...state,
                dayLogId: action.dayLogId,
                breakfast: [...action.breakfast],
                lunch: [...action.lunch],
                dinner: [...action.dinner],
            };
        
        default:
            return state;
    }
};

export function useHomeReducer(initialState) {
    return useReducer(reducer, initialState);
};