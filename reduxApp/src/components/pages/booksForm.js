"use strict"
import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/booksActions';


class BooksForm extends React.Component{
	state = {
		errorTitle: false,
		errorDescription: false,
		errorPrice: false
	}

	handleSubmit(){
		let book=[{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value,
		}]

		console.log("subbmiting", book[0], this.state);
		let flag = 0;
		if (book[0].title ===''){
			console.log('changing state title')
			this.setState({
				errorTitle: true
			})
			flag = 1;	
		}

		if (book[0].description === ''){
			console.log('changing description')
			this.setState({
				errorDescription: true
			})
			flag = 1;
		}

		if (!(new RegExp("^([0-9]*.[0-9]*)$")).test(book[0].price)){
			this.setState({
				errorPrice: true
			})
			flag = 1;
		}
		if (flag==0) {
			this.props.postBooks(book);
			findDOMNode(this.refs.title).value = '';
			findDOMNode(this.refs.description).value = '';
			findDOMNode(this.refs.price).value = '';
		}
		console.log("subbmiting", book[0], this.state);
		// if (book[0].title!='' && book[0].price!=null){
		// 	this.setState({
		// 		errorStatus: false,
		// 	})
		// 	this.props.postBooks(book);
		// }
		// else{
		// 	this.setState({
		// 		errorStatus: true,
		// 	})
		// 	console.log('book.title',book[0].title);
		// 	console.log('book.price',book);
		// 	// window.alert('please enter atleast the book title and price')
		// }
	}

	onDelete(){
		let bookId = findDOMNode(this.refs.delete).value;
		this.props.deleteBooks(bookId);
	}

	validate(valid){
		console.log('====checking====', valid);
		if (value=='' || value==null)
		return "Please enter valid details";
	}

	validate_me = (text) => {
		let message;
		switch(text){
		case 'title': message = this.state.errorTitle ? "Please enter book title. Example Title: Origin" : ""; break;
		case 'description': message = this.state.errorDescription ? "Please enter book description. Example Description: A book by Dan Brown)" : ""; break;
		case 'price': message = this.state.errorPrice ? "Please enter the price of book properly. Price: 17.0" : ""; break;
		}
		return message;
}
	render(){
		const booksList = this.props.books.map(function(booksArr){
			return(
				<option key={booksArr._id}>
					{booksArr._id}
				</option>
			)
		})

		return(
			<Well>
				<Panel>
					<FormGroup controlId="title">
						<ControlLabel>Title</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title" 
							onChange={({target})=> {
							console.log('====>>title<<<===',target.value);
							if (target.value != ""){
								this.setState({
									errorTitle: false
								})
							}
							}}
							/>
							<p style={{color:'red'}}>{this.validate_me('title')}</p>
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description" 
							onChange={
								
								({target})=>{
									console.log('====>>description<<<===',target.value);
								if (target.value != ''){
									this.setState({errorDescription: false})
								}
							}}
							/>
							<p style={{color:'red'}}>{this.validate_me('description')}</p>
					</FormGroup>
					<FormGroup controlId="price">
						<ControlLabel>Price</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Price"
							ref="price" 
							onChange={({target})=>{
								console.log('====>>price<<<===',target.value, (new RegExp("^([0-9])$")).test(target.value), typeof target.value);
								if ((new RegExp("^([0-9])$")).test(target.value)){
									this.setState({errorPrice: false})
								}
							}}
							/>
							<p style={{color:'red'}}>{this.validate_me('price')}</p>
					</FormGroup>
					<Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save book</Button>
				</Panel>
				<Panel>
					<FormGroup controlId="formControlSelect">
					<ControlLabel>Select a book id to delete</ControlLabel>
					<FormControl
						ref = "delete"
						componentClass="select"
						placeholder="select">
					<option value="select">Select</option>
					{booksList}
					</FormControl>
					</FormGroup>
					<Button onClick={this.onDelete.bind(this)} bsStyle='primary'>Delete Book</Button>
				</Panel>
			</Well>
		)
	}
}

function mapStateToProps(state){
	return {books: state.books.books}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		postBooks: postBooks,
		deleteBooks: deleteBooks}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);