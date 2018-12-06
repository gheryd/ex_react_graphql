const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql');

const TaskType = new GraphQLObjectType({
    name: 'TaskType',
    fields: {
        id: {type: GraphQLID},
        content: {type: GraphQLString},
        userId: {type: GraphQLID}
    }
});

module.exports = TaskType;