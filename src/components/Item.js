import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { addToCart, removeFromCart } from '../actions/cart';

class Item extends Component
{
    addToCart = (phone) => {
        const { addToCart } = this.props;
        addToCart(phone);
    };

    render() {
        const item = this.props.item;

        return (
            <Card>
                <Image src={ item.image } />
                <Card.Content>
                    <Card.Header>{ item.title }</Card.Header>
                    <Card.Meta>
                        <span className='date'>{ item.company }</span>
                    </Card.Meta>
                    <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='ruble' />
                        { item.price }
                    </a>
                </Card.Content>

                <Button onClick={this.addToCart.bind(this, item)}>Добавить в корзину</Button>
            </Card>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: cart => {
        return dispatch(addToCart(cart));
    }
});

export default connect(null, mapDispatchToProps)(Item);