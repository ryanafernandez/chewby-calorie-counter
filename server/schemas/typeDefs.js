const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    loggedDays: [LoggedDay]
  }

  type LoggedDay {
    _id: ID
    entry: String
    createdAt: String
    loggedDayAuthor: String
  }

  type Auth {
    _id: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    loggedDays(username: String): [LoggedDay]
    loggedDay(loggedDayId: ID!): LoggedDay
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLoggedDay(entry: String!, loggedDayAuthor: String!): LoggedDay
  }
`;

module.exports = typeDefs;
