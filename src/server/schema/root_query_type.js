const {GraphQLObjectType, GraphQLList} = require('graphql');

const TaskType = require("./task_type");
const UserType = require("./user_type");
const Task = require("../models/task");
const task = new Task();
const Auth = require("../models/auth");
const auth = new Auth();

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parentValue, args, req){
                return task.getAll();
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args, req){
                return auth.getAll()
            }
        },
        user: {
            type: UserType,
            resolve(parentValue, args,req){
                console.log("query user resove", req.user);
                return req.user;
            }
        }
    }
});


module.exports = RootQueryType;