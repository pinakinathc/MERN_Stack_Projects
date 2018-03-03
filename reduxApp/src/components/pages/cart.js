"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component{
	constructor(){
		super();
		this.state = {
			showModal: false
		}
	}
	open(){
		this.setState({showModal: true})
	}
	close(){
		this.setState({showModal: false})
	}
	onDelete(_id){
		const currentCartToDelete = this.props.cart;
		const indexToDelete = currentCartToDelete.findIndex(
			function(cart){
				return cart._id ===  _id;
			}
		)
		this.props.deleteCartItem(indexToDelete);
	}

	onUpdate(_id, value){
		const currentCartToUpdate = this.props.cart;
		const indexToUpdate = currentCartToUpdate.findIndex(
			function(cart){
				return cart._id === _id;
			}
		)
		this.props.updateCart(indexToUpdate, value);
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}
	renderEmpty(){
		return (<div></div>)
	}

	renderCart(){
		const cartItemsList = this.props.cart.map(function(cartArr){
			return (
				<Panel headerkey={cartArr._id}>
				<Row key={cartArr._id}>
					<Col xs={12} sm={4}>
						<h6>{cartArr.title}</h6><span>    </span>
					</Col>
					<Col xs={12} sm={2}>
						<h6>usd. {cartArr.price}</h6>
					</Col>
					<Col xs={12} sm={2}>
						<h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
					</Col>
					<Col xs={6} sm={4}>
						<ButtonGroup style={{minWidth:'300px'}}>
						<Button onClick={this.onUpdate.bind(this, cartArr._id, -1)} bsStyle="default" bsSize="small">-</Button>
						<Button onClick={this.onUpdate.bind(this, cartArr._id, 1)} bsStyle="default" bsSize="small">+</Button>
						<span>    </span>
						<Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
						</ButtonGroup>
					</Col>
				</Row>
				</Panel>
			)
		}, this)
		return(
			<Panel bsStyle="primary">
			<Panel.Heading>Cart</Panel.Heading>
				<Panel.Body>
				{cartItemsList}
				<Row>
					<Col xs={12}>
					<h6>Total amount: </h6>
					<Button onClick={this.open.bind(this)} bsStyle='success' bsSize='small'>
					Proceed To Checkout
					</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
				<Modal.Header closeButton>
				<Modal.Title>Thank You!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h6>Your order has been saved</h6>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.close.bind(this)}>Close</Button>
				</Modal.Footer>
				</Modal>
				</Panel.Body>
			</Panel>
		)
	}
}
function mapStateToProps(state){
	return{cart: state.cart.cart}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem: deleteCartItem,
		updateCart: updateCart
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);