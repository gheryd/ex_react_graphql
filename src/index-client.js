import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from "./client/components/App"
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';

const link = createHttpLink({
    uri: '/graphql',
    'credentials': 'same-origin'
});

const apolloClient = new ApolloClient({
    dataIdFromObject: o => o.id,
    ssrForceFetchDelay: 100,
    link,
    connectToDevTools: true,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    
    defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
		watchQuery: {
			fetchPolicy: 'no-cache',
        },
    }
    
});

hydrate(
    <ApolloProvider client={apolloClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('react-container')
);