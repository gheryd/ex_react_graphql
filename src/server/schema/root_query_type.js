const {GraphQLObjectType, GraphQLList} = require('graphql');

const TaskType = require("./task_type");
const Task = require("../models/task");
const task = new Task();

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parentValue, args, req){
                return task.getAll();
            }
        }
    }
});


module.exports = RootQueryType;