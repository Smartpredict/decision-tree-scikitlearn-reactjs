import React, {Component} from "react"
import {connect} from "react-redux"
// import uuidv1 from "uuid"
// import {addArticle} from "../actions"
import {updateColumns} from "../actions"

import $ from 'jquery'

const mapDispatchToProps = dispatch => {
	return {
		//addArticle: article => dispatch(addArticle(article))
		updateColumns: columns => dispatch(updateColumns(columns))
	}
}

class ConnectedForm extends Component{
	constructor(){
		super()
		//this.state ={
		//	title: "",
		//	columns: []
		//}
		this.state ={
			columns: []
		}
		// this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	//handleChange(event){
	//	this.setState({
	//		[event.target.id]: event.target.value
	//	})
	//}
	
	handleSubmit(event) {
		event.preventDefault()
		//const { title } = this.state
		//const id = uuidv1()
		//this.props.addArticle({title,id})
		//this.setState({title: ""})
		
		var formData = new FormData()
		formData.append('csv_file', $('#csvfile')[0].files[0])

		let _this = this
		
		$.ajax({
			url: '/loadfile',
			type: 'POST',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			enctype: 'multipart/form-data',
			success: function(data){
				console.log(data)
				_this.setState({
					columns: data
				})
				const {columns} = _this.state
				_this.props.updateColumns(columns)
			},
			error: function(jqxhr, txtstatus, error){
				console.log(jqxhr)
				console.log(txtstatus)
				console.log(error)
			}
		})
	}
	
	
	
	render(){
		// const {title} = this.state
		return (
			<div className="row col-md-12">
			<form onSubmit={this.handleSubmit} id="file_form" action="/loadfile">
				<div className="col-sm-6">
					<label htmlFor="csvfile">
						Fichier
					</label>
					<input
						id="csvfile"
						type="file"
						name="csvfile"
					/>
				</div>
				<div className="col-sm-6">
					<button type="submit">
						SAVE
					</button>
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

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form