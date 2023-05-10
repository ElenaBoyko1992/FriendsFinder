import React from 'react';
import s from './MyPosts.module.css';
import commonStyles from '../../common/CommonStyles.module.css';
import Post from "./Post/Post";
import {MyPostsType} from "./MyPostsContainer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "utils/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props: MyPostsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesAmount={p.likesAmount} key={p.id}/>)

    const addPost = (values: AddPostValueType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>Posts</h3>
            <AddPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength100 = maxLengthCreator(100);

const AddNewPostForm: React.FC<InjectedFormProps<AddPostValueType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.textareaWrapper}>
                {createField('Enter your message', 'newPostText', [required, maxLength100], Textarea, {}, '', `${commonStyles.textarea}`)}
            </div>
            <div>
                <button className={`${commonStyles.button} ${s.button}`}>Add post</button>
            </div>

        </form>

    )
}

const AddPostFormRedux = reduxForm<AddPostValueType>({
    // a unique name for the form
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)

export default MyPosts;

//types
type AddPostValueType = {
    newPostText: string
}