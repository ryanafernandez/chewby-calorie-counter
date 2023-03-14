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
    loggedDay: String!
    loggedDayAuthor: String!
    timestamp: String
    entries: [Entry]
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
    loggedDay(loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    entry(entryId: ID!): Entry
    entries(loggedDayAuthor: String): [Entry]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addLoggedDay(loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    addEntry(item: String!, calories: Int!, loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    removeEntry(entryId: String!, loggedDayId: String!): LoggedDay
  }
`;

module.exports = typeDefs;
