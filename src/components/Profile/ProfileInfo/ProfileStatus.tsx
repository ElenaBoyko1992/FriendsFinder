import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';


class ProfileStatus extends React.Component<any, any> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----------'}</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} value={this.state.status} onBlur={this.deactivateEditMode}
                               autoFocus={true}/>
                    </div>}
            </div>
        )
    }

}

export default ProfileStatus;