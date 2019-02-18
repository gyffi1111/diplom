import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Items from './components/Items';

import Menu from './components/Menu';

class App extends Component {

    render() {
        return (
            <Container fluid>
                <Menu />
                <Route path="/" exact component={MainPage} />
                <Route path="/catalog" component={Items} />
            </Container>
        );
    }
}


export default App;
