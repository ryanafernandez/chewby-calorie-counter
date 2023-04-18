import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
        _id
        email
        username
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

export const QUERY_SINGLE_DAY_LOG = gql`
    query DayLog($day: String!, $userId: String!) {
        dayLog(day: $day, user_id: $userId) {
            _id
            day
            user_id {
                _id
            }
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