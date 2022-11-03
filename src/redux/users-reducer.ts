import {ActionsTypes} from "./redux-store";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

export type UserType = {
    id: number,
    photos: { small: string | undefined, large: string | undefined },
    followed: boolean,
    name: string,
    status: string,
    location: { city: string, country: string }
}

export type UsersPageType = {
    users: Array<UserType>
}

let initialState: UsersPageType = {
    users: [],
}

const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;

    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}) as const

export default usersReducer;