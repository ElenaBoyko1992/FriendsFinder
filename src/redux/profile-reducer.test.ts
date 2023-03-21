import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

const startState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesAmount: 5},
        {id: 2, message: 'Hi, its my first post', likesAmount: 11},
        {id: 2, message: 'Blabla', likesAmount: 11},
        {id: 2, message: 'Dada', likesAmount: 11},
    ],
    profile: null,
    status: ''
};

test('post should be added', () => {


    const endState = profileReducer(startState, addPostActionCreator('бла-бла'))

    expect(endState.posts[4].message).toBe('бла-бла');
    expect(endState.posts.length).toBe(5);

});

test('after deleting length of messages should be decrement', () => {

    const endState = profileReducer(startState, deletePost(1))

    expect(endState.posts.length).toBe(3);

});

test('after deleting length of messages shouldn`t be decrement if id is incorrect', () => {

    const endState = profileReducer(startState, deletePost(1000))

    expect(endState.posts.length).toBe(4);

});