import usersReducer, {
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching
} from "./users-reducer";

const state = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

test('users must be set', () => {
    const users = [
        {
            id: 1,
            photos: {small: null, large: null},
            followed: true,
            name: 'John',
            status: 'free',

        },
        {
            id: 2,
            photos: {small: null, large: null},
            followed: false,
            name: 'Kate',
            status: 'hello',

        }
    ]

    const endState = usersReducer(state, setUsers(users))

    expect(endState.users.length).toBe(2);
    expect(endState.users[0].name).toBe('John');
    expect(endState.users[1].followed).toBeFalsy();
});

test('current page must be set', () => {

    const endState = usersReducer(state, setCurrentPage(12))

    expect(endState.currentPage).toBe(12);

});

test('total user count must be set', () => {

    const endState = usersReducer(state, setTotalUsersCount(10))

    expect(endState.totalUsersCount).toBe(10);

});

test('isFetching must be changed', () => {

    const endState = usersReducer(state, toggleIsFetching(true))

    expect(endState.isFetching).toBeTruthy();

});

test('userId must be added to followingInProgress', () => {

    const endState = usersReducer(state, toggleFollowingProgress(true, 356))

    expect(endState.followingInProgress.length).toBe(1);
    expect(endState.followingInProgress[0]).toBe(356);

});