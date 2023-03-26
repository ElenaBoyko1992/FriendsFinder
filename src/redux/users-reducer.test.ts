import usersReducer, {followSuccess} from "./users-reducer";

const state = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

test('must be FOLLOW', () => {
    const endState = usersReducer(state, followSuccess(236))

    expect(endState.users.length).toBe(1);
    expect(endState.users[0].id).toBe(236);
    expect(endState.users[0].followed).toBe(true);
});