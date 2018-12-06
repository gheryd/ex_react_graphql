const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');
const Task = require("../models/task");
const TaskType = require('./task_type');
const task = new Task();

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: { 
        addTask: {
            type: TaskType,
            args: {
                content: {type: GraphQLString}
            },
            resolve(parentValue, {content}, req){
                return task.add(content)
            }
        },
        deleteTask: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parentValue, {id}, req){
                return task.remove(id);
            }
        },
    }
});

module.exports = mutation;