import {
    errorLink,
    subscriptionLink,
    requestLink,
    queryOrMutationLink,
} from '../links';
import { StaticRouter } from "react-router-dom";
import ReactDOM from 'react-dom/server';
import App from "../../client/components/App";
import React from 'react';
import Html from '../../client/Html'
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import ApolloClient from "apollo-client";
import fetch from 'node-fetch';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link';

module.exports = (app) => {

    
    const links = [
        errorLink,
        queryOrMutationLink({
            fetch,
            uri: `http://localhost:3000/graphql`,
        }),
    ];
    app.use("/", (req, res) => {
        const client = new ApolloClient({
            ssrMode: true,
            link: ApolloLink.from(links),
            cache: new InMemoryCache(),
        });
    
        const component =
            <ApolloProvider client={client}>
                <StaticRouter location={req.url} context={{}}>
                    <App />
                </StaticRouter>
            </ApolloProvider>
            ;
        renderToStringWithData(component)
            .then(content => {
                res.status(200);
                const html = <Html content={content} client={client} />;
                res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
                res.end();
            })
            .catch(e => {
                console.error('RENDERING ERROR:', e); // eslint-disable-line no-console
                res.status(500);
                res.end(
                    `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${
                    e.stack
                    }`
                );
            });
    });
}