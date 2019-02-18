import React, {Component} from 'react';
import { Container } from "semantic-ui-react";

class MainPage extends Component
{
    render() {
        return (
            <Container>
                <h1 style={{textAlign: 'center'}}>Добро пожаловать</h1>
            </Container>
        );
    }
}

export default MainPage;