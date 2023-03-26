import appReducer, {initializedSuccess} from "./app-reducer";

const startState = {
    initialized: false
};

test('initialization must be successful', () => {
    const endState = appReducer(startState, initializedSuccess())

    expect(endState.initialized).toBe(true);
});