import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import App from './App';
import NavbarPOS from './Navbar/Navbar.js'
import MenuList from './Menu/MenuList';

const routing = (
  <Router>
    <div>
      <Container>
      <div>
        <NavbarPOS></NavbarPOS>
      </div>

      <hr/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/menu" component={MenuList} />        
      </Switch>
      </Container>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
