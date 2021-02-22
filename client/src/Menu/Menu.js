import React from "react";
import {Form,Button, Row, Col} from 'react-bootstrap';
import MenuService from '../services/MenuService';

class Menu extends React.Component
{
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.submitMenu = this.submitMenu.bind(this);

      this.state ={
          _id:'',
          name:'',
          price:{
            $numberDecimal:''
          }
      }
    }

    async componentDidMount(){
      if(this.props.selectedMenu && this.props.selectedMenu!== null)
      {
        this.setState({
            _id:this.props.selectedMenu._id,
            name:this.props.selectedMenu.name,
            price:{
              $numberDecimal: this.props.selectedMenu.price.$numberDecimal
            }
        });
      }
    }

    handleChange(e){
      this.setState({ [e.target.name] : e.target.value });
    }
    handleClose(){
      this.props.onHide();
    }

    submitMenu = async (e) => {
        e.preventDefault();
        if(this.props.isEdit)
        {
          const params= {
            _id: this.state._id,
            name: this.state.name,
            price: {
              $numberDecimal:this.state.price
            }
          }
          let res = await MenuService.UpdateMenu(this.state._id,params);
          if(res.error === false)
          {
            this.setState({
              _id:'',
              name:'',
              price:{
                $numberDecimal:''
              }
            });
            this.handleClose();
          }
        }
        else
        {
          const params= {
            name: this.state.name,
            price: {
              $numberDecimal:this.state.price
            }
          }
          let res = await MenuService.CreateMenu(params);          
          if(res.error === false)
          {
            this.setState({
              _id:'',
              name:'',
              price:{
                $numberDecimal:''
              }
            });
            this.handleClose();
          }
        }
    }

    render(){
      return(
        <div>
        <Form onSubmit={this.submitMenu} ref="form">
          <Form.Group as={Row} controlId="formPrice">
           <Form.Label column sm={2}>Name</Form.Label>
           <Col sm={10}>
           <Form.Control name="name" placeholder="Enter name" onChange={this.handleChange.bind(this)} value={this.state.name}/>
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formPrice">
          <Form.Label column sm={2}>Price</Form.Label>
          <Col sm={10}>
          <Form.Control name="price" placeholder="Enter price" onChange={this.handleChange.bind(this)} value={this.state.price.$numberDecimal}/>
          </Col>
        </Form.Group>

        <Button variant="primary" onClick={this.submitMenu.bind(this)}>Submit</Button>
        </Form>

        <hr/>
        </div>
      )}
}

export default Menu
