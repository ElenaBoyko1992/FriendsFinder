import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

export type PostsType = {
    id: number
    message: string
    likesAmount: number
}
type MyPostsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
    posts: Array<PostsType>
    newPostText: string
}

const MyPosts = (props: MyPostsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesAmount={p.likesAmount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>(); //ссылка на textarea

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value;
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;