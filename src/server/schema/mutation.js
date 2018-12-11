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
        signup: {
            type: UserType,
            args: {
                nickname: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {nickname, password}, req){
                console.log(nickname, password);
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
                console.log("mutation login user: ",user);
                //const userLogged =  {nickname: user.nickname};
                //console.log("user logged: ",userLogged);
                return user;
            }
        },
        logout: {
            type: UserType,
            async resolve(parentValue, args, req){
                const {user} = req;
                console.log("logout:", user)
                req.logout();
                return user;
            }
        }
    }
});

module.exports = mutation;