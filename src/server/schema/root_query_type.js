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
                if(!req.user || !req.user.id){
                    return null;
                }
                return task.getAllByUser(req.user.id);
            }
        },
        user: {
            type: UserType,
            resolve(parentValue, args, req){
                console.log("[RootQuerytype(user)] req.user:", req.user);
                return req.user;
            }
        }
    }
});


module.exports = RootQueryType;