const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {type: GraphQLID},
        nickname: {type: GraphQLString},
    }
});

module.exports = UserType;