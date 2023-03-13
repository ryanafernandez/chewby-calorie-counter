import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
            _id
            email
            username
            loggedDays {
                createdAt
                entries {
                  _id
                  calories
                  item
                }
            }
        }
    }
`;