import React from "react";
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink, 
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import MyHome from './pages/signedPages/MyHome';
import Navbar from "./components/Navbar";
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');

  return { 
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route
                path="/me/*"
                element={<MyHome />}
              />
              <Route
                path="*"
                element={<h1 className="display-2">Page Not Found</h1>}
              />
            </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
