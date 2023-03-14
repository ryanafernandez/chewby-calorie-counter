import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_ENTRY = gql`
  mutation AddEntry($item: String!, $calories: Int!, $loggedDay: String!, $loggedDayAuthor: String!) {
    addEntry(item: $item, calories: $calories, loggedDay: $loggedDay, loggedDayAuthor: $loggedDayAuthor) {
      _id
      entries {
        _id
        calories
        item
      }
      loggedDay
      loggedDayAuthor
      timestamp
    }
  }
`;

export const ADD_LOGGED_DAY = gql`
  mutation AddLoggedDay($loggedDay: String!, $loggedDayAuthor: String!) {
    addLoggedDay(loggedDay: $loggedDay, loggedDayAuthor: $loggedDayAuthor) {
      _id
      entries {
        _id
        calories
        item
      }
      loggedDay
      loggedDayAuthor
      timestamp
    }
  }
`;