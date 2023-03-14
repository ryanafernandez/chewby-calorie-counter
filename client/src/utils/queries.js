import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
        _id
        email
        loggedDays {
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
    }
`;

export const QUERY_SINGLE_LOGGED_DAY = gql`
    query LoggedDay($loggedDay: String!, $loggedDayAuthor: String!) {
        loggedDay(loggedDay: $loggedDay, loggedDayAuthor: $loggedDayAuthor) {
            _id
            entries {
                _id
                calories
                item
            }
        }
    }
`;