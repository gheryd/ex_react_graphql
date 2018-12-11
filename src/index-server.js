const express = require('express');
const expressGraphQL = require('express-graphql');
const config = require('config');
import path from 'path';
const schema = require("./server/schema/schema");

const fileAssets = express.static(
    path.join(__dirname, '../dist/assets')
);

const app = express();

app.use(fileAssets);

require("./server/startup/passport")(app);

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema: schema
}));

require("./server/startup/apollo")(app);

app.listen(3000, () => console.log("listen 3000..."));
