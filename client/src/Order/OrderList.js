import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import OrderService from '../services/OrderService';

function OrderList() {

    const [orders, setOrders] = useState([])
    async function getOrders() {
        try {
            let res = await OrderService.GetOrder();
            setOrders(res)

        } catch (error) {
            console.error('error', error)
        }
    }
    async function deleteOrder(id) {
        let resp = await OrderService.DeleteOrder(id);
        getOrders();
    }

    useEffect(() => {
        getOrders()
    }, [])

    const handleDelete = (id) => {
        let resp = deleteOrder(id)
        getOrders();
    }

    return (
        <>
            <div>
                <Button variant="info" onClick={handleShow}>Add Order</Button>
                {
                    orders.map((order, index) => {
                        return (<>
                            <div onClick={() => handleEdit(order)} >
                                <h4>Order Id : {order._id}</h4>
                                <h3>Total :{order.totalPrice.$numberDecimal}</h3>
                                <Button size='sm' onClick={() => handleDelete(order._id)}>Delete</Button>
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
            </div>
        </>
    )

}

export default OrderList
