import authReducer, {setAuthUserData, setUserAvatar} from "./auth-reducer";

const startState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    userAvatar: null
};

test('user data must be set', () => {
    const endState = authReducer(startState, setAuthUserData(123, 'Boiko@mail.ru', 'Elena', true))

    expect(endState.isAuth).toBeTruthy();
    expect(endState.login).toBe('Elena');
});

test('user avatar must be set', () => {
    const endState = authReducer(startState, setUserAvatar('src...'))

    expect(endState.userAvatar).toBeTruthy();
    expect(endState.userAvatar).toBe('src...');
});