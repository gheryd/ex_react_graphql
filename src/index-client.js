import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from "./client/components/App"
import {ApolloProvider} from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
    errorLink,
    queryOrMutationLink,
    subscriptionLink,
    requestLink,
} from './links';

const links = [
    errorLink,
    requestLink({
        queryOrMutationLink: queryOrMutationLink(),
        subscriptionLink: subscriptionLink(),
    }),
];

const apolloClient = new ApolloClient({
    dataIdFromObject: o => o.id,
    ssrForceFetchDelay: 100,
    link: ApolloLink.from(links),
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