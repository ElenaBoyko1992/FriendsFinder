import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props: any) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)

    useEffect(() => {

        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || '-----------'}</span>
                </div>}
            {editMode &&
                <div>
                    <input
                        autoFocus={true} onBlur={deactivateEditMode}
                        onChange={onStatusChange} value={status}/>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHooks;