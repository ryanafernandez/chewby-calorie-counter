const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    loggedDays: [LoggedDay]
  }

  type LoggedDay {
    _id: ID
    entries: [Entry]
    createdAt: String
    loggedDayAuthor: String!
  }

  type Entry {
    _id: ID
    item: String!
    calories: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    loggedDays(username: String): [LoggedDay]
    loggedDay(loggedDayId: ID!): LoggedDay
    entry(entryId: ID!): Entry
    entries(loggedDayAuthor: String): [Entry]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addLoggedDay(loggedDayAuthor: String!): LoggedDay
    addEntry(item: String!, calories: Int!, loggedDayId: String!): LoggedDay
    removeEntry(entryId: String!, loggedDayId: String!): LoggedDay
  }
`;

module.exports = typeDefs;
