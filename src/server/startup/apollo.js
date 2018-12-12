import { StaticRouter } from "react-router-dom";
import ReactDOM from 'react-dom/server';
import App from "../../client/components/App";
import React from 'react';
import Html from '../../client/Html'
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import ApolloClient from "apollo-client";
import fetch from 'node-fetch';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';

module.exports = (app) => {
    
    app.use("/", (req, res) => {

        const client = new ApolloClient({
            link: new HttpLink({
                uri: 'http://localhost:3000/graphql', 
                fetch,
                'credentials': 'same-origin'
            }),
            cache: new InMemoryCache()
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
                    `An error occurred. \n\n${
                    e.stack
                    }`
                );
            });
    });
}