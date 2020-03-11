import animationTrigger from 'helpers/loadingAnimationTrigger';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userServices } from 'services';
import * as actions from 'services/redux/user/actions';
import './ProfilePicture.css';
import { toast } from 'react-toastify';
import * as constants from 'constants/index';

function ProfilePicture(props) {
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        updateAvatarClass: 'd-none',
        modalShown: false,
        newImageData: null,
    })

    // useEffect(() => {
    //     console.log(state)
    //     // console.log(userData)
    // }, [state.newImageData])

    // useEffect(() => {
    //     getAvatarFromServer()
    // }, [])

    const handleModalClose = () => setState({
        ...state,
        modalShown: false,
        updateAvatarClass: 'd-none',
    })

    const handleModalShow = () => setState({
        ...state,
        modalShown: true
    })

    const mouseEnterAction = () => setState({
        ...state,
        updateAvatarClass: ''
    })

    const mouseLeaveAction = () => setState({
        ...state,
        updateAvatarClass: 'd-none'
    })

    const handleImageData = (event) => {
        // console.log(event.target.files[0])
        let tempFile = event.target.files[0];
        if (tempFile) {
            let fileType = tempFile["type"];
            let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.indexOf(fileType) > -1) {
                setState({
                    ...state,
                    newImageData: tempFile
                });
            }
            else {
                setState({
                    ...state,
                    newImageData: null
                });
            }
        }
    }

    const getNewImageSrc = () => {
        if (state.newImageData) {
            // require('asset/images/user.jpg')
            // console.log(URL.createObjectURL(state.newImageData))
            return URL.createObjectURL(state.newImageData)
        }
        else {
            return getCurrentAvatar()
        }
    }

    const getCurrentAvatar = () => {
        return constants.user_get_avatar_address + userData.username
    }

    const sendUpdateAvatarRequest = () => {
        if (state.newImageData) {
            animationTrigger.startLoading()
            var formData = new FormData();
            formData.append("user_avatar", state.newImageData);
            userServices.updateAvatar(userData.username, formData, userData.accessToken).then(res => {
                // console.log(res.data)
                animationTrigger.stopLoading()
                handleModalClose()
                toast.success('Avatar updated successful, reloading...')
                window.location.reload()
            }).catch((err) => {
                animationTrigger.stopLoading()
            })
        }
        else {
            toast.error("Please choose your new profile picture");
        }
    }


    return (
        <div className="avartar-wrapper position-relative d-flex flex-column align-items-center justify-content-center overflow-hidden" onMouseEnter={mouseEnterAction} onMouseLeave={mouseLeaveAction}>
            <img src={getCurrentAvatar()} width="100%" alt="user avatar" />
            <span id="update-avatar" className={state.updateAvatarClass} onClick={handleModalShow}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <span style={{ "color": "#ffffffaa" }}><i className="fas fa-camera-retro"></i></span>
                    <span style={{ "fontSize": "12px", "fontWeight": "bold" }}>Update</span>
                </div>
            </span>

            <Modal size="md" show={state.modalShown} onHide={handleModalClose} centered>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <div className="avartar-wrapper d-flex flex-column justify-content-center align-items-center overflow-hidden m-2">
                        <img className="m-2" src={getNewImageSrc()} width="100%" alt="user avatar" />
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div className="custom-file overflow-hidden">
                            <input type="file" className="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01" onChange={handleImageData} />
                            <label className="custom-file-label no-wrap" htmlFor="inputGroupFile01">{state.newImageData ? state.newImageData.name : 'Choose your picture...'}</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-center pb-2">
                    <Button variant="primary" onClick={sendUpdateAvatarRequest}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ProfilePicture;