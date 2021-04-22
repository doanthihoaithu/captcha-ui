import React, { useRef, useState } from 'react';
import animationTrigger from 'helpers/loadingAnimationTrigger';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { analysisServices } from 'services';
import "./analysis.scss"
import Result from './Result';
import { Form } from 'react-bootstrap';
import * as constants from 'constants/index'

function Analysis() {
	const accessToken = useSelector(state => state.user.accessToken);

	const [img, setImg] = useState(null)
	const [detectCapcha, setDetectCapcha] = useState(false)
	const [text, setText] = useState(null)
	const [data, setData] = useState({})
	const [queryType, setQueryType] = useState({
		elasticsearch: true,
		text: true,
		image: true,
		combination: true,
	})

	const queryTextRef = useRef(null);

	const [requestSucceeded, changeRequestStatus] = useState(false);
	const [somethingWronged, changeSomethingWrongedStatus] = useState(false);

	const handleImageData = (event) => {
		// console.log(event.target.files[0])
		const tempFile = event.target.files[0];
		if (tempFile) {
			const fileType = tempFile.type;
			const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
			if (validImageTypes.indexOf(fileType) > -1) {
				setImg(tempFile)
			}
			else {
				setImg(null)
			}
		}
	}

	// const requestAnalysis = (queryText) => {
	// 	animationTrigger.startLoading();

	// 	const formData = new FormData();
	// 	formData.append('text', queryText)
	// 	formData.append('image', img)
	// 	formData.append('types', JSON.stringify(queryType))
	// 	console.log(process.env.REACT_APP_BACKEND_HOST);

	// 	analysisServices.analyzeQuery(accessToken, formData).then((res) => {
	// 		console.log(res.data)
	// 		setDetectCapcha(res.data.success)
	// 		setText(res.data.text)
	// 		// setImg(res.data);
	// 		// @TODO show the returned data, currently log only


	// 		// changeRequestStatus(true);
	// 		// changeSomethingWrongedStatus(false);
	// 		// setData(res.data)
	// 		animationTrigger.stopLoading()
	// 	}).catch(err => {
	// 		console.log(err)
	// 		changeSomethingWrongedStatus(true);
	// 		setData([])
	// 		animationTrigger.stopLoading()
	// 	})
	// }

	const requestAnalysis = () => {
		animationTrigger.startLoading();

		const formData = new FormData();
		formData.append('image', img)

		analysisServices.analyzeQuery(accessToken, formData).then((res) => {
			console.log(res.data)
			setDetectCapcha(res.data.success)
			setText(res.data.text)
			// setImg(res.data);
			// @TODO show the returned data, currently log only


			// changeRequestStatus(true);
			// changeSomethingWrongedStatus(false);
			// setData(res.data)
			animationTrigger.stopLoading()
		}).catch(err => {
			console.log(err)
			changeSomethingWrongedStatus(true);
			setData([])
			animationTrigger.stopLoading()
		})
	}

	const onFormSubmit = (event) => {
		event.preventDefault();
		// console.log(valid)
		if (img) {
			requestAnalysis();
		} else {
			alert('Please input something')
		}
	}

	const toggleQueryType = (type) => {
		setQueryType({
			...queryType,
			[type]: !queryType[type]
		})
	}

	return (
		<div className="container-contact100 animated fadeIn fast analysis-container">
			<div className="wrap-contact100">
				<button className="btn-hide-contact100">
					<i className="zmdi zmdi-close" />
				</button>

				<div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
					<span>Analysis</span>
				</div>
				{
					requestSucceeded
						? (
							<div className="d-flex align-items-center justify-content-center m-5 flex-column">
								{/* <h3 className="text-success text-center mb-3">Result</h3> */}
								<Result data={data} />
								<div className="d-flex flex-column justify-content-center align-items-center mt-4">
									<Link to="#" className="text-info" onClick={() => changeRequestStatus(false)}>Analyze something else</Link>
								</div>
							</div>
						) : (
							<form className="contact100-form validate-form" onSubmit={onFormSubmit}>
								{/* <div className="wrap-input100 validate-input">
									<input type="text" ref={queryTextRef} className="input100" id="queryText" placeholder="Enter query text" required={false} />
									<span className="focus-input100" />
									<label className="label-input100" htmlFor="text-query">
										<span className="lnr lnr-pencil m-b-2" />
									</label>
								</div> */}

								<div className="input-group my-3">
									<div className="input-group-prepend">
										<span className="input-group-text py-3" id="inputGroupFileAddon01">Upload</span>
									</div>
									<div className="custom-file overflow-hidden" style={{ height: 'unset' }}>
										<input
											type="file"
											className="custom-file-input"
											id="inputGroupFile01"
											aria-describedby="inputGroupFileAddon01"
											onChange={handleImageData}
											style={{ height: 'unset' }}
										/>
										<label className="custom-file-label no-wrap py-3" htmlFor="inputGroupFile01" style={{ height: 'unset', fontSize: '1rem' }}>{img ? img.name : 'Choose your picture...'}</label>
									</div>
								</div>
								{/* <Form.Group className="col-6">
									<Form.Check type="checkbox" label="Elasticsearch" checked={queryType.elasticsearch} onChange={() => toggleQueryType('elasticsearch')} />
									<Form.Check type="checkbox" label="Image" checked={queryType.image} onChange={() => toggleQueryType('image')} />
								</Form.Group>
								<Form.Group className="col-6">
									<Form.Check type="checkbox" label="Text" checked={queryType.text} onChange={() => toggleQueryType('text')} />
									<Form.Check type="checkbox" label="Combine" checked={queryType.combination} onChange={() => toggleQueryType('combination')} />
								</Form.Group> */}

								<div className="w-100 text-center mb-1"><span className="text-danger" hidden={!somethingWronged}>Something went wrong. Please try agiain!</span></div>

								<div className="container-contact100-form-btn">
									<button className="contact100-form-btn" type="submit">
										Analyze
      								</button>
								</div>
							</form>
						)}
						{
							detectCapcha ? (
								<div className="d-flex justify-content-center flex-column align-items-center">
									<h3>Result</h3>
									<h1>{text}</h1>
									<img src={constants.analysis_analyze_result + "?" + new Date().getTime() } />						
								</div>
							): null
						}
						
			</div>
		</div>
	)
};

export default Analysis