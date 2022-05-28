const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: String
  }

  input  UserInput {
    id: ID
    username: String
    age: String
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }

  type Mutation {
    createUser (input: UserInput): User
  }

`);

module.exports = schema;
