import React, {Component} from "react"
import {connect} from "react-redux"
import {updateInColumns} from "../actions"

import $ from 'jquery'

const mapDispatchToProps = dispatch => {
	return {
		updateInColumns: inColumns => dispatch(updateInColumns(inColumns))
	}
}

const mapStateToProps = state => {
	return {columns: state.columns}
}

class ConnectedColSelect extends Component{
	constructor(){
		super()
		//this.state ={
		//	title: "",
		//	columns: []
		//}
		 this.state ={
		 	columnsIn: [],
			availableCols: [],
			columnOut: ""
		 }
		// this.handleChange = this.handleChange.bind(this)
		this.handleChangeIn = this.handleChangeIn.bind(this)
		this.handleChangeOut = this.handleChangeOut.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	//handleChange(event){
	//	this.setState({
	//		[event.target.id]: event.target.value
	//	})
	//}
	
	handleChangeIn(event){
		const oldState = this.state
		const target = event.target
		
		let _this = this
		
		this.setState({
			...oldState,
			columnsIn: {
				...oldState.columnsIn,
				[target.id]: target.checked
			}
		},() => {
			let _availableCol = []
			let _columns = _this.props.columns
			var i
			for(i = 0; i < _columns.length; i++){
				let col = _columns[i]
				if (!_this.state.columnsIn[col]){
					_availableCol.push(col)
				}
			}
			const _oldState = _this.state
			_this.setState({
				..._oldState,
				availableCols: _availableCol
			})
		})
		
	}
	
	handleChangeOut(event) {
		const oldState = this.state
		const target = event.target
		
		this.setState({
			...oldState,
			columnOut: target.id
		})
	}
	
	handleSubmit(event) {
		event.preventDefault()
		console.log(this.state)
		
		let columnsIn = this.state.columnsIn
		let ci_keys = Object.keys(columnsIn)
		
		let inlist = []
		
		var i
		for(i = 0; i < ci_keys.length; i++){
			if(columnsIn[ci_keys[i]]){
				inlist.push(ci_keys[i])
			}
		}
		
		this.props.updateInColumns(inlist)
		
		let output = this.state.columnOut
		
		let postData = {
			inlist: inlist,
			output: output
		}
		
		postData = JSON.stringify(postData)
		
		console.log(postData)
		
		$.ajax({
			url: '/trainmodel',
			type: 'POST',
			data: postData,
			contentType: 'application/json; charset=UTF-8',
			success: function(data){
				console.log(data)
			}
		})
	}
	
	render(){
		// const {title} = this.state
		const {columns} = this.props
		const availableCols = this.state.availableCols
		return (
			<form onSubmit={this.handleSubmit} id="colselect_form" action="/trainmodel">
				<div className="col-xs-6">
					<p>Colomnes d'entrées (INPUT)</p>
					{columns.map((col, i) => (
						<p>
						<input
							key={i}						
							id={col}
							type="checkbox"
							name={col}
							value={col}
							onChange={this.handleChangeIn}
						/> {col}
						</p>
					))}
				</div>
				<div className="col-xs-6">
					<p>Colomnes de sorties (OUTPUT)</p>
					{availableCols.map((col, i) => (
						<p>
						<input
							key={i}			
							id={col}
							type="radio"
							name="output_col"
							value={col}
							onChange={this.handleChangeOut}
						/> {col}
						</p>
					))}
				</div>
				<button type="submit">
					OK
				</button>
			</form>
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

const ColSelect = connect(mapStateToProps, mapDispatchToProps)(ConnectedColSelect)

export default ColSelect