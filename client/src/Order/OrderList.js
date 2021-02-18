import React from "react";
import {Button,Table,Modal} from 'react-bootstrap';
import OrderService from '../services/OrderService';
import Menu from '../Menu/Menu';
import OrderConfirmation from './OrderConfirmation';

class OrderList extends React.Component
{
    constructor(props){
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.updateOrder = this.updateOrder.bind(this);
      this.deleteOrder = this.deleteOrder.bind(this);
      this.state ={
        orders:[],
        selectedOrder:'',
        selectedMenu:'',
        selectedAdditionalItem:[],
        show:false,
      }
    }

    componentDidMount(){
      this.getAllOrders();
    }

    handleClose(){
      this.setState({
        show:false
      });
      this.getAllOrders();
    }

    getAllOrders =async()=>{
      let res = await OrderService.GetAllOrders();
      this.setState({
        orders:res
      });
    }

    updateOrder = async(order) => {
      this.setState({
        show:true,
        selectedOrder:order,
        selectedMenu:order.menu,
        selectedAdditionalItem:order.additionalItem
      })
    }

    deleteOrder = async(order) => {
      const orderId = order._id;
      let res = await OrderService.DeleteOrder(orderId);

      if(res.error ===false)
        this.getAllOrders()
    }

    render(){

      const renderOrder =(o,index)=> {
        let toppings = []
        if(o.additionalItem.length >0)
        {
          o.additionalItem.map(ai => {toppings.push(ai.ingredient)})
          toppings = toppings.join();
        }
        else {
          toppings.push('-');
        }

        return(
          <tr>
            <td>{o.menu.flavour.flavour}</td>
            <td>{o.menu.size}</td>
            <td>{o.menu.crust}</td>
            <td>{toppings}</td>
            <td>{o.totalPrice}</td>
            <td><Button onClick={this.updateOrder.bind(this,o)}>Edit</Button></td>
            <td><Button onClick={this.deleteOrder.bind(this,o)}>Delete</Button></td>
          </tr>
        );
      }

      return(
        <div>
        <p></p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Flavour</th>
              <th>Size</th>
              <th>Crust</th>
              <th>Additional Toppings</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            (this.state.orders !== undefined && this.state.orders.length >0) ?
            (
              this.state.orders.map((o,index) => renderOrder(o,index))
            )
            :
            (
              <tr></tr>
            )
          }
          </tbody>
        </Table>

        <Modal id='MenuItemModal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderConfirmation selectedOrder={this.state.selectedOrder}
                                selectedMenu={this.state.selectedMenu}
                                selectedAdditionalItem={this.state.selectedAdditionalItem}
                                onHide={this.handleClose.bind(this)}
                                isEdit={true}>
            </OrderConfirmation>
          </Modal.Body>
        </Modal>
        </div>
      )}
}

export default OrderList
