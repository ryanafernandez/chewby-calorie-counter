import React from 'react';
import { useQuery } from '@apollo/client';

import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Dashboard';
import FoodLog from './FoodLog';
import Settings from './Settings';
import { HomeProvider } from '../../utils/HomeContext';

import { GET_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

function MyHome() {
    const { loading, error, data } = useQuery(GET_ME);
    const userIdData = data?.me._id;

    // If no user data found, return home (switch to login page)
    if (error) return <Navigate to="/" />;
    if (loading) {
        return 'Loading...';
    }

    // User found, render dashboard


    return (
        <HomeProvider userId={userIdData}>
        
            <Routes>
                {/* 
                    / can still be used to navigate to Home
                    /me and /me/dashboard will render the dashboard
                 */}
                <Route
                    path="/"
                    element={<Dashboard />}
                />
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/foodlog"
                    element={<FoodLog />}
                />
                <Route
                    path="/settings"
                    element={<Settings />}
                />
            </Routes>
        </HomeProvider>
    )
}

export default MyHome;