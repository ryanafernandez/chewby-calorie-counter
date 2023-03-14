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
  mutation AddEntry($item: String!, $calories: Int!, $loggedDayId: String!) {
    addEntry(item: $item, calories: $calories, loggedDayId: $loggedDayId) {
      _id
      createdAt
      entries {
        _id
        calories
        item
      }
      loggedDayAuthor
    }
  }
`;