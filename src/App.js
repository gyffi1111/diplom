import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Items from './components/Items';
import CreateItem from './components/admin/CreateItem';
import EditItem from './components/admin/EditItem';
import AdminItems from './components/admin/Items';
import Menu from './components/Menu';
import './App.css'

class App extends Component {

    render() {
        return (
            <Container fluid>
                <Menu />
                <Route path="/" exact component={MainPage} />
                <Route path="/catalog" component={Items} />
                <Route path="/item/create" component={CreateItem} />
                <Route path="/items" component={AdminItems} />
                <Route path="/item/edit/:id" component={EditItem} />
            </Container>
        );
    }
}

export default App;
