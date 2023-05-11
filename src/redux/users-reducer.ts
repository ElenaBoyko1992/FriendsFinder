import {followingAPI, usersAPI} from "api/api";
import {AppThunkDispatch} from "./redux-store";
import {updateObjectInArray} from "utils/object-helpers";
import {UserType} from "api/types";

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: UsersPageType = initialState, action: UsersActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;

    }
}

//AC
export const followSuccess = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
}) as const

//thunks
export const requestUsers = (page: number, pageSize: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    try {
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }
    dispatch(toggleIsFetching(false))
}

//функция для избежания дублирования кода в санках follow и unfollow
const followUnfollowFlow = async (dispatch: AppThunkDispatch, userId: number, apiMethod: typeof followingAPI.follow | typeof followingAPI.unfollow, actionCreator: typeof followSuccess | typeof unfollowSuccess) => {
    dispatch(toggleFollowingProgress(true, userId))
    try {
        let response = await apiMethod(userId)
        if (response.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
    } catch (error: any) {
        alert(error.message ? error.message : 'Some error occurred')
    }

    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: AppThunkDispatch) => {
    let apiMethod = followingAPI.follow.bind(followingAPI)

    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)

}

export const unfollow = (userId: number) => async (dispatch: AppThunkDispatch) => {
    let apiMethod = followingAPI.unfollow.bind(followingAPI)

    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
}

//types
export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

export type UsersActionsTypes =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>


export default usersReducer;