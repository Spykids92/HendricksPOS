import React from "react";
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import MenuService from '../services/MenuService';
import OrderService from '../services/OrderService';
import { CartXFill, CartPlusFill } from 'react-bootstrap-icons';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnAdd = this.handleOnAdd.bind(this);
        this.handleOnRemove = this.handleOnRemove.bind(this);
        this.submitOrder = this.submitOrder.bind(this);

        this.state = {
            IsEdit: false,
            orderSelectionList: {
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
                    qty: '',
                    subTotalPrice: {
                        $numberDecimal: ''
                    }
                }],
            },

            order: {
                totalPrice: {
                    $numberDecimal: ''
                },
                items: [],
            },

            selectedOrder: {
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
            }
        }
    }

    async componentDidMount() {
        this.getMenuList();
    }

    handleClose() {
        this.props.onHide();
    }
    handleOnAdd(param) {
        let menuId = param.item.menu_id;
        let index = this.state.orderSelectionList.items.findIndex(i => i.item.menu_id == menuId);
        let updatedItem = this.state.orderSelectionList.items.find(i => i.item.menu_id == menuId);
        updatedItem.qty = updatedItem.qty + 1;
        updatedItem.subTotalPrice.$numberDecimal = (updatedItem.item.price.$numberDecimal * updatedItem.qty).toFixed(2);

        let sum = 0;
        if (this.state.IsEdit) {
            let selectedOrderIndex = this.state.selectedOrder.items.findIndex(i => i.item.menu_id == menuId);
            if (selectedOrderIndex != null && selectedOrderIndex >= 0) {
                this.state.selectedOrder.items[selectedOrderIndex] = updatedItem;
            }
            else {
                this.state.selectedOrder.items.push(updatedItem);
            }
            this.state.orderSelectionList.items[index] = updatedItem
            this.state.orderSelectionList.items.forEach(i => {
                sum = sum + parseFloat(i.subTotalPrice.$numberDecimal)
            });
            this.state.selectedOrder.totalPrice.$numberDecimal = sum.toFixed(2);
        }
        else {
            let orderIndex = this.state.order.items.findIndex(i => i.item.menu_id == menuId);
            if (orderIndex != null && orderIndex >= 0) {
                this.state.order.items[orderIndex] = updatedItem;
            }
            else {
                this.state.order.items.push(updatedItem);
            }
            this.state.order.items.forEach(i => {
                sum = sum + parseFloat(i.subTotalPrice.$numberDecimal)
            });
            this.state.order.totalPrice.$numberDecimal = sum.toFixed(2);
        }
        this.state.orderSelectionList.totalPrice.$numberDecimal = sum.toFixed(2);
        this.setState({
            order: this.state.order,
            orderSelectionList: this.state.orderSelectionList,
            selectedOrder: this.state.selectedOrder
        })
    }
    handleOnRemove(param) {
        let menuId = param.item.menu_id;
        let index = this.state.orderSelectionList.items.findIndex(i => i.item.menu_id == menuId);
        let updatedItem = this.state.orderSelectionList.items.find(i => i.item.menu_id == menuId);
        if (updatedItem.qty > 0) {
            updatedItem.qty = updatedItem.qty - 1;
            updatedItem.subTotalPrice.$numberDecimal = (updatedItem.item.price.$numberDecimal * updatedItem.qty).toFixed(2);

            let sum = 0;
            if (this.state.IsEdit) {
                let selectedOrderIndex = this.state.selectedOrder.items.findIndex(i => i.item.menu_id == menuId);
                if (selectedOrderIndex != null && selectedOrderIndex >= 0) {
                    if (updatedItem.qty == 0) {
                        this.state.selectedOrder.items.splice(selectedOrderIndex, 1);
                    }
                    else {
                        this.state.selectedOrder.items[selectedOrderIndex] = updatedItem;
                    }
                }
                this.state.orderSelectionList.items[index] = updatedItem
                this.state.orderSelectionList.items.forEach(i => {
                    sum = sum + parseFloat(i.subTotalPrice.$numberDecimal)
                });
                this.state.selectedOrder.totalPrice.$numberDecimal = sum.toFixed(2);
            }
            else {
                let orderIndex = this.state.order.items.findIndex(i => i.item.menu_id == menuId);
                if (orderIndex != null && orderIndex >= 0) {
                    this.state.order.items[orderIndex] = updatedItem;
                }
                else {
                    this.state.order.items.push(updatedItem);
                    this.state.order.items.forEach(i => {
                        sum = sum + parseFloat(i.subTotalPrice.$numberDecimal)
                    });
                    this.state.order.totalPrice.$numberDecimal = sum.toFixed(2);
                }
            }
            this.state.orderSelectionList.totalPrice.$numberDecimal = sum.toFixed(2);
            this.setState({
                order: this.state.order,
                orderSelectionList: this.state.orderSelectionList,
                selectedOrder: this.state.selectedOrder
            })
        }
    }

    getMenuList = async () => {
        let menus = await MenuService.GetMenu();
        if (this.props.isEdit) {
            this.state.selectedOrder = this.props.selectedOrder;

            let itms = [];
            menus.forEach(menu => {
                let orderIndex = this.state.selectedOrder.items.findIndex(i => i.item.menu_id == menu._id);
                if (orderIndex >= 0) {
                    let item = {
                        item: {
                            menu_id: menu._id,
                            name: menu.name,
                            price: {
                                $numberDecimal: menu.price.$numberDecimal
                            }
                        },
                        qty: this.state.selectedOrder.items[orderIndex].qty,
                        subTotalPrice: {
                            $numberDecimal: this.state.selectedOrder.items[orderIndex].subTotalPrice.$numberDecimal
                        }
                    };
                    itms.push(item);
                }
                else {
                    let item = {
                        item: {
                            menu_id: menu._id,
                            name: menu.name,
                            price: {
                                $numberDecimal: menu.price.$numberDecimal
                            }
                        },
                        qty: 0,
                        subTotalPrice: {
                            $numberDecimal: "0.00"
                        }
                    };
                    itms.push(item);
                }
            });

            let ord = {
                totalPrice: {
                    $numberDecimal: this.state.selectedOrder.totalPrice.$numberDecimal
                },
                items: itms
            }
            this.setState({ orderSelectionList: ord, IsEdit: true })
        }
        else {
            let itms = [];
            menus.forEach(menu => {

                let item = {
                    item: {
                        menu_id: menu._id,
                        name: menu.name,
                        price: {
                            $numberDecimal: menu.price.$numberDecimal
                        }
                    },
                    qty: 0,
                    subTotalPrice: {
                        $numberDecimal: "0.00"
                    }
                }
                itms.push(item);
            });

            let ord = {
                totalPrice: {
                    $numberDecimal: "0.00"
                },
                items: itms
            }
            this.setState({ orderSelectionList: ord })
        }
    }

    submitOrder = async () => {
        if (this.props.isEdit) {
            let params = this.state.selectedOrder

            let res = await OrderService.UpdateOrder(params._id, params);
            if (res.error === false) {
                this.setState({
                    orderSelectionList: {
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
                            qty: '',
                            subTotalPrice: {
                                $numberDecimal: ''
                            }
                        }],
                    },

                    selectedOrder: {
                        totalPrice: {
                            $numberDecimal: ''
                        },
                        items: [],
                    },
                });
                this.handleClose();
            }
        }
        else {
            const params = this.state.order;
            let res = await OrderService.CreateOrder(params);
            if (res.error === false) {
                this.setState({
                    orderSelectionList: {
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
                            qty: '',
                            subTotalPrice: {
                                $numberDecimal: ''
                            }
                        }],
                    },

                    order: {
                        totalPrice: {
                            $numberDecimal: ''
                        },
                        items: [],
                    },
                });
                this.handleClose();
            }
        }
    }

    render() {
        return (
            <>
                <div id={this.state.orderSelectionList._id}>
                    <div>
                        <h4 style={{ float: "left" }}>Total Price : {this.state.orderSelectionList.totalPrice.$numberDecimal}</h4>
                        <h4 style={{ float: "right" }}><Button variant="info" onClick={this.submitOrder.bind(this)}>Submit</Button></h4>
                    </div>
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderSelectionList.items.map((i, index) => {
                                        return (<>
                                            <tr key={i.item.menu_id}>
                                                <td>{i.item.name}</td>
                                                <td>{i.item.price.$numberDecimal}</td>
                                                <td>{i.qty}</td>
                                                <td>{i.subTotalPrice.$numberDecimal}</td>
                                                <td><CartPlusFill color="green" onClick={() => this.handleOnAdd(i)} /></td>
                                                <td><CartXFill color="red" onClick={() => this.handleOnRemove(i)} /></td>
                                            </tr>
                                        </>)
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div >
            </>

        )
    }
}

export default Order;
