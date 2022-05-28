const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const cors = require('cors');
app.use(cors());
const users = [
  { id: 1, username: 'vasya', age: '25' },
  { id: 2, username: 'petya', age: '27' },
];

const createUser = (input) => {
  const id = Date.now();
  return { id, ...input };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

const schema = require('./schema');
app.use(
  '/graphql',
  graphqlHTTP({ graphiql: true, schema: schema, rootValue: root })
);
app.listen(5000, () => console.log('server started'));
