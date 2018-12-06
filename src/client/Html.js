import React from 'react';
const Html = ({ content, client: { cache } }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
                integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
                crossOrigin="anonymous"
            />
            <title>Task list</title>
        </head>
        <body>
            <div id="react-container" dangerouslySetInnerHTML={{ __html: content }} />
            <script
                charSet="UTF-8"
                dangerouslySetInnerHTML={{
                    __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};`,
                }}
            />
            <script src="/bundle.js"></script>
        </body>
    </html>
);
export default Html;