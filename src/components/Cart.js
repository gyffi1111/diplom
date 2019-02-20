import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { List, Button, Image } from "semantic-ui-react";
import { removeFromCart } from "../actions/cart";

class Cart extends Component
{
    removeFromCart = (id) => {
        const { removeFromCart } = this.props;

        removeFromCart(id);
    };


    render() {
        const item = this.props;

        return (
            <List selection divided verticalAlign="middle">
                <List.Item>
                    <List.Content floated="right">
                        <Button onClick={this.removeFromCart.bind(this, item.id)} color="red">
                            Удалить
                        </Button>
                    </List.Content>
                    <Image avatar src={item.image} />
                    <List.Content>{item.title}</List.Content>
                </List.Item>
            </List>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => {
        return dispatch(removeFromCart(id));
    }
});

export default connect(null, mapDispatchToProps)(Cart);