const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    loggedDays: [LoggedDay]
  }

  type Goals {
    _id: ID!
    calorie_goal: Int
    user_id: User!
  }

  type LoggedDay {
    _id: ID
    loggedDay: String!
    loggedDayAuthor: String!
    timestamp: String
    entries: [Entry]
  }

  type DayLog {
    _id: ID
    day: String!
    user_id: User!
    breakfast: [Food]
    lunch: [Food]
    dinner: [Food]
    water: Int
  }

  type Food {
    _id: ID
    nume: String!
    calories: Int!
    protein: Int
    fat: Int
    carbs: Int
    user_id: User
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
    goal(user_id: String!): Goals
    dayLog(day: String!, user_id: String!): DayLog
    loggedDays(username: String): [LoggedDay]
    loggedDay(loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    entry(entryId: ID!): Entry
    entries(loggedDayAuthor: String): [Entry]

  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGoals(user_id: String!): Goals
    updateGoals(calorie_goal: Int!, user_id: String!): Goals
    addDayLog(day: String!, user_id: String!): DayLog
    addFood(name: String!, calories: Int!, protein: Int, fat: Int, carbs: Int, user_id: String): Food
    addToBreakfast(day: String!, user_id: String!, food_id: String!): DayLog
    addToLunch(day: String!, user_id: String!, food_id: String!): DayLog
    addToDinner(day: String!, user_id: String!, food_id: String!): DayLog
    addLoggedDay(loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    addEntry(item: String!, calories: Int!, loggedDay: String!, loggedDayAuthor: String!): LoggedDay
    removeEntry(entryId: String!, loggedDayId: String!): LoggedDay
    updateEntry(entryId: String!, item: String!, calories: Int!): LoggedDay
  }
`;

module.exports = typeDefs;
