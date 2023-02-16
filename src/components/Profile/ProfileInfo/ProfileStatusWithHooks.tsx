import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props: any) => {

    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '-----------'}</span>
                </div>}
            {editMode &&
                <div>
                    <input
                        autoFocus={true} onBlur={deactivateEditMode}/>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHooks;