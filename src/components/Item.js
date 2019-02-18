import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class Item extends Component
{
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
            </Card>
        );
    }
}

export default Item;