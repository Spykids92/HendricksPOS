import React from "react";
import {Button,Table,Modal} from 'react-bootstrap';
import MenuService from '../services/MenuService';
// import Menu from './Menu';

class MenuList extends React.Component
{
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

    constructor(props){
      super(props);
      this.state ={
        menus:[{
          _id:'',
          name:'',
          price:{
            $numberDecimal:''
          },
        }],
        selectedMenu:{
          _id:'',
          name:'',
          price:{
            $numberDecimal:''
          }
        },
        show:false,
        isEdit:false
      }
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.editMenu = this.editMenu.bind(this);
      this.deleteMenu = this.deleteMenu.bind(this);
    }

    componentDidMount(){
      this.getMenuList();
    }

    handleChange(e){
      this.setState({ [e.target.name] : e.target.value });
    }
    handleClose(){
      this.setState({show:false});
      this.getMenuList();
    }
    handleShow(){
      this.setState({
        selectedMenu:{
          _id:'',
          flavour:{
            flavour:'',
            description:''
          },
          size:'',
          crust:'',
          price:''
        },
        isEdit:false,show:true});
    }

    deleteMenu = async (m) => {
      await MenuService.DeleteMenu(m._id);
      this.getMenuList();
    }

    editMenu = async (m) => {
      this.setState({selectedMenu:m, isEdit:true,show:true})
    }

    getMenuList = async () =>{
      let res = await MenuService.GetMenu();
      this.setState({menus:res});
    }

    render(){
      return(
        <div>
        <Button variant="info" onClick={this.handleShow.bind(this)}>Add Menu</Button>
        <p></p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.menus.map(menu =>
                (
                  <tr key={menu._id}>
                    <td>{menu.name}</td>
                    <td>{menu.price.$numberDecimal}</td>
                    <td><Button size='sm' onClick={() => this.editMenu(menu)}>Edit</Button></td>
                    <td><Button size='sm' onClick={() => this.deleteMenu(menu)}>Delete</Button></td>
                  </tr>
              ))
            }
          </tbody>
        </Table>
        </div>
      )}
}

export default MenuList
