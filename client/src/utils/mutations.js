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

export const REMOVE_ENTRY = gql`
  mutation RemoveEntry($entryId: String!, $loggedDayId: String!) {
    removeEntry(entryId: $entryId, loggedDayId: $loggedDayId) {
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

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($entryId: String!, $item: String!, $calories: Int!) {
    updateEntry(entryId: $entryId, item: $item, calories: $calories) {
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

export const ADD_BREAKFAST = gql`
  mutation AddBreakfast($day: String!, $userId: String!, $foodId: String!) {
    addBreakfast(day: $day, user_id: $userId, food_id: $foodId) {
      _id
      day
      breakfast {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      lunch {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      dinner {
        _id
        calories
        carbs
        fat
        name
        protein
      }
    }
  }
`;

export const ADD_LUNCH = gql`
  mutation AddLunch($day: String!, $userId: String!, $foodId: String!) {
    addLunch(day: $day, user_id: $userId, food_id: $foodId) {
      _id
      day
      breakfast {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      lunch {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      dinner {
        _id
        calories
        carbs
        fat
        name
        protein
      }
    }
  }
`;

export const ADD_DINNER = gql`
  mutation AddDinner($day: String!, $userId: String!, $foodId: String!) {
    addDinner(day: $day, user_id: $userId, food_id: $foodId) {
      _id
      day
      breakfast {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      lunch {
        _id
        calories
        carbs
        fat
        name
        protein
      }
      dinner {
        _id
        calories
        carbs
        fat
        name
        protein
      }
    }
  }
`;