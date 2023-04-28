import React, { createContext, useContext } from 'react';

const FormContext = createContext();
const { Provider } = FormContext;

const FormProvider = ({ value = [], ...props}) => {

};

const useFormContext = () => {
    return useContext(FormContext);
};

export { FormProvider, useFormContext };