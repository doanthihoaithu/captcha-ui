import React, { useRef, useState } from 'react';
import animationTrigger from 'helpers/loadingAnimationTrigger';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { analysisServices } from 'services';
import "./analysis.scss"

function Analysis() {
    const accessToken = useSelector(state => state.user.accessToken);

    const [img, setImg] = useState(null)

    const queryTextRef = useRef(null);

    const [requestSucceeded, changeRequestStatus] = useState(false);
    const [somethingWronged, changeSomethingWrongedStatus] = useState(false);

    const handleImageData = (event) => {
        // console.log(event.target.files[0])
        let tempFile = event.target.files[0];
        if (tempFile) {
            let fileType = tempFile["type"];
            let validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
            if (validImageTypes.indexOf(fileType) > -1) {
                setImg(tempFile)
            }
            else {
                setImg(null)
            }
        }
    }

    const requestAnalysis = (queryText) => {
        animationTrigger.startLoading();

        let formData = new FormData();
        formData.append('text', queryText)
        formData.append('image', img)
        analysisServices.analyzeQuery(accessToken, formData).then((res) => {
            console.log(res);
            changeRequestStatus(true);
            changeSomethingWrongedStatus(false);
            animationTrigger.stopLoading()
        }).catch(err => {
            console.log(err)
            changeSomethingWrongedStatus(true);
            animationTrigger.stopLoading()
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const valid = event.target.checkValidity();
        // console.log(valid)
        if (valid) {
            requestAnalysis(queryTextRef.current.value);
        }
    }

    return (
        <div className="container-contact100 animated fadeIn fast analysis-container">
            <div className="wrap-contact100">
                <button className="btn-hide-contact100">
                    <i className="zmdi zmdi-close"></i>
                </button>

                <div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
                    <span>Analysis</span>
                </div>
                {
                    requestSucceeded
                        ?
                        <div className="d-flex align-items-center justify-content-center m-5 flex-column">
                            <h3 className="text-success text-center">Successful</h3>
                            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                <Link className="text-info" onClick={() => changeRequestStatus(false)}>Analyze something else</Link>
                            </div>
                        </div>
                        :
                        <form className="contact100-form validate-form" onSubmit={onFormSubmit}>
                            <div className="wrap-input100 validate-input">
                                <input type="text" ref={queryTextRef} className="input100" id="queryText" placeholder="Enter query text" required={false} />
                                <span className="focus-input100"></span>
                                <label className="label-input100" htmlFor="text-query">
                                    <span className="lnr lnr-pencil m-b-2"></span>
                                </label>
                            </div>

                            <div className="input-group my-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text py-3" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div className="custom-file overflow-hidden" style={{ height: 'unset' }}>
                                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01" onChange={handleImageData} style={{ height: 'unset' }} />
                                    <label className="custom-file-label no-wrap py-3" htmlFor="inputGroupFile01" style={{ height: 'unset' }}>{img ? img.name : 'Choose your picture...'}</label>
                                </div>
                            </div>

                            <div className="w-100 text-center mb-1"><span className="text-danger" hidden={!somethingWronged}>Something went wrong. Please try agiain!</span></div>

                            <div className="container-contact100-form-btn">
                                <button className="contact100-form-btn" type="submit">
                                    Analyze
                                </button>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
};

export default Analysis