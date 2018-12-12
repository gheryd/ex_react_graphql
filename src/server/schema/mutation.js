const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');
const Task = require("../models/task");
const TaskType = require('./task_type');
const UserType = require("./user_type");
const task = new Task();
const Auth = require("../models/auth")
const auth = new Auth();

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: { 
        addTask: {
            type: TaskType,
            args: {
                content: {type: GraphQLString}
            },
            resolve(parentValue, {content}, req){
                console.log("[mutation.addTask] content:", content);
                if(!req.user || !req.user.id){
                    console.log("[mutation.addTask] user not found in request");
                    return null;
                }
                return task.add(content, req.user.id)
            }
        },
        deleteTask: {
            type: TaskType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parentValue, {id}, req){
                console.log("[mutation.deleteTask] id:", id);
                if(!req.user || !req.user.id){
                    console.log("[mutation.deleteTask] user not found in request");
                    return null;
                }
                return task.remove(id, req.user.id);
            }
        },
        signup: {
            type: UserType,
            args: {
                nickname: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {nickname, password}, req){
                console.log("[mutation.signup] credentials: ", nickname, password);
                return auth.signup(nickname, password, req)
            }
        },
        login: {
            type: UserType,
            args: {
                nickname: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parentValue, {nickname, password}, req ){
                const user =  await auth.login(nickname, password, req);
                console.log("[mutation.login] loggedIn user: ",user);
                return user;
            }
        },
        logout: {
            type: UserType,
            async resolve(parentValue, args, req){
                const {user} = req;
                console.log("[mutation.logout] logout for user:", user)
                await req.logout();
                req.session.destroy();
                req.session = null;
                return user;
            }
        }
    }
});

module.exports = mutation;