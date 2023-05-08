import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {MyPostsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props: MyPostsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesAmount={p.likesAmount} key={p.id}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>(); //ссылка на textarea

    // let onAddPost = () => {
    //     props.addPost();
    // }
    //
    // let onPostChange = () => {
    //     if (newPostElement.current) {
    //         let text = newPostElement.current.value;
    //         props.updateNewPostText(text)
    //     }
    // }

    const addPost = (values: AddPostValueType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm: React.FC<InjectedFormProps<AddPostValueType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} component={Textarea} name={'newPostText'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
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