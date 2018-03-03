import React from 'react';
import {Row, Col, Well, Button, Glyphicon, Modal, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addToCart} from '../../actions/cartActions';
import {findDOMNode} from 'react-dom';
import {updateBooks} from '../../actions/booksActions';

class BookItem extends React.Component{
	constructor(){
		super();
		this.state = {
			show: false
		}
	}
	open(){
		this.setState({show: true})
	}
	close(){
		this.setState({show: false})
	}
	updateBook(){
		this.setState({show: false})
		const book={
			_id: this.props._id,
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value,
		}
		console.log('========hello baby!!=====',book);
		this.props.updateBooks(book);
	}
	handleCart(){
		const book = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price,
			quantity: 1
		}]
		// Check if Cart if Empty
		this.props.addToCart(book);
	}

	render(){
		return(
			<Well>
				<Row>
					<Col xs={12}>
						<h6>Title: {this.props.title} 
						<Button onClick={this.open.bind(this)} bsStyle='link pull-right'>
						<Glyphicon glyph="pencil"/>
						Edit it Baby!!
						</Button>
						</h6>
						<h6>Description: {this.props.description}</h6>
						<h6>usd. {this.props.price}</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
					</Col>
				</Row>
				<Modal show={this.state.show} onHide={this.close.bind(this)}>
				<Modal.Header closeButton>
				<Modal.Title>Book Edit Option Activated</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<FormGroup controlId="title">
						<ControlLabel>Title</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title" />
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description" />
					</FormGroup>
					<FormGroup controlId="price">
						<ControlLabel>Price</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Price"
							ref="price" />
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.updateBook.bind(this)}>Update Book Info</Button>
					<Button onClick={this.close.bind(this)}>Close</Button>
				</Modal.Footer>
				</Modal>
			</Well>
			)
	}
}

function mapStateToProps(state){
	return {
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart: addToCart,
		updateBooks: updateBooks
	}, dispatch)
}

export default connect (mapStateToProps,
			mapDispatchToProps)(BookItem);