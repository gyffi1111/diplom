import React, { Component } from 'react';
import { connect } from "react-redux";
import './../animate.min.css';
import {Card, Icon, Image, Button, Rating} from 'semantic-ui-react';
import { addToCart } from '../actions/cart';

class Item extends Component
{
    addToCart = (phone) => {
        const { addToCart } = this.props;
        addToCart(phone);
    };

    render() {
        const item = this.props.item;

        return (
            <Card className="animated zoomIn item-list" >
                <div className="item-list-image">
                    <Image src={ item.image } />
                </div>
                <Card.Content>
                    <Card.Header>{ item.title }</Card.Header>
                    <Card.Meta>
                        <span className='date'>{ item.company }</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='ruble' /> { item.price }
                    <br />
                    <Rating defaultRating={item.rating} maxRating={5} disabled />
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