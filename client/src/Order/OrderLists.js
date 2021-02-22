import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import OrderService from '../services/OrderService';
import Order from './Order';

class OrderLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [{
                _id: '',
                totalPrice: {
                    $numberDecimal: ''
                },
                items: [{
                    item: {
                        menu_id: '',
                        name: '',
                        price: {
                            $numberDecimal: ''
                        }
                    },
                    _id: '',
                    qty: '',
                    subTotalPrice: {
                        $numberDecimal: ''
                    }
                }],
            }],
            show: false,
            isEdit: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentDidMount() {
        this.getOrders();
    }

    handleClose() {
        this.setState({ show: false });
        this.getOrders();
    }
    handleShow() {
        this.setState({
            selectedOrder: [],
            isEdit: false, show: true
        });
    }

    deleteOrder = async (id) => {
        let resp = await OrderService.DeleteOrder(id);
        this.getOrders();
    }

    editOrder = async (m) => {
        // this.setState({ selectedMenu: m, isEdit: true, show: true })
    }

    getOrders = async () => {
        try {
            let res = await OrderService.GetOrder();
            this.setState({ orders: res });
        } catch (error) {
            console.error('error', error)
        }
    }
    render() {
        return (
            <>
                <div>
                    <Button variant="info" onClick={this.handleShow}>Add Order</Button>
                    {
                        this.state.orders.map((order, index) => {
                            return (<>
                                <div onClick={() => this.editOrder(order)} >
                                    <h4>Order Id : {order._id}</h4>
                                    <h3>Total :{order.totalPrice.$numberDecimal}</h3>
                                    <Button size='sm' onClick={() => this.deleteOrder(order._id)}>Delete</Button>
                                    <div>{order.items.map((i, index) => {
                                        return (<>
                                            <div> Name :{i.item.name}</div>
                                            <div> Price :{i.item.price.$numberDecimal}</div>
                                            <div> Quantity :{i.qty}</div>
                                            <div> SubTotal :{i.subTotalPrice.$numberDecimal}</div>
                                            <br></br>
                                        </>)
                                    })}</div>
                                </div>
                                < hr />
                            </>)
                        })
                    }
                    <Modal id='OrderModal' show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{(this.state.isEdit) ? 'Update Order' : 'New Order'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Order
                                isEdit={this.state.isEdit}
                                onHide={this.handleClose.bind(this)}>
                            </Order>
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        )
    }
}

export default OrderLists
