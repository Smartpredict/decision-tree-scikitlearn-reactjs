import React, {Component} from "react"
import {connect} from "react-redux"

import $ from 'jquery'

const mapStateToProps = state => {
	return {inColumns: state.columnsIn}
}

class ConnectedPredict extends Component{
	constructor(){
		super()
		this.state ={
			inValues: {},
			outValue: ""
		}
		
		// this.handleChangeIn = this.handleChangeIn.bind(this)
		// this.handleChangeOut = this.handleChangeOut.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const oldState = this.state
		this.setState({
			...oldState,
			inValues: {
				...oldState.inValues,
				[event.target.id]: event.target.value
			}
		})
	}
	
	handleSubmit(event) {
		event.preventDefault()
		
		let inValuesArray = []
		
		var i
		let _inColumns = this.props.inColumns
		// rearrange in the initial order of the columns
		for(i = 0; i < _inColumns.length ; i++){
			let col = _inColumns[i]
			inValuesArray.push(this.state.inValues[col])
		}
		
		let postData = {
			invalues: inValuesArray
		}
		
		let _this = this
		postData = JSON.stringify(postData)
		$.ajax({
			url: '/predict',
			type: 'POST',
			data: postData,
			contentType: 'application/json; charset=UTF-8',
			success: function(data){
				_this.setState({
					...this.state,
					outValue: data
				})
			}
		})
	}
	
	render(){
		const {inColumns} = this.props
		const {outValue} = this.state
		return (
			<div className="row">
			<form onSubmit={this.handleSubmit} id="predict_form" action="/predict">
				<div className="col-sm-6">
					<p>Valeurs d'entrées (INPUT)</p>
					{inColumns.map((col, i) => (
						<p>
						<label htmlFor={col}>
							{col}
						</label>
						<input
							key={i}						
							id={col}
							type="text"
							name={col}
							onChange={this.handleChange}
						/>
						</p>
					))}
				</div>
				<div className="col-sm-6">
					<button type="submit">
						OK
					</button>
				</div>
				<div className="col-sm-12">
					<h3>Résultat de la prédiction</h3>
					<h3>{outValue}</h3>
				</div>
			</form>
			</div>
		)
	}
}

//<label htmlFor="title">
//	Title
//</label>
//<input
//	type="text"
//	id="title"
//	value={title}
//	onChange={this.handleChange}
// />

const Predict = connect(mapStateToProps)(ConnectedPredict)

export default Predict