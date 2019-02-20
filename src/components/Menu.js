import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Popup, Label } from 'semantic-ui-react';
import { addToCart, removeFromCart } from '../actions/cart';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import uniqBy from 'lodash/uniqBy';

class MainMenu extends Component
{
    render() {
        const cart  = this.props;
        return (
            <Segment inverted>
                <Menu inverted secondary>
                    <Menu.Item name='home'>
                        <NavLink to="/" activeClassName="SActivated">
                            Главная
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item name='catalog'>
                        <NavLink to="/catalog" activeClassName="SActivated">
                            Каталог
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item name='items'>
                        <NavLink to="/items" activeClassName="SActivated">
                            Управление продуктами
                        </NavLink>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item name='signup'>
                            Итого: &nbsp; <b>{cart.totalPrice}</b>&nbsp;руб.
                        </Menu.Item>

                        <Popup
                            trigger={
                                <Menu.Item name="help" onClick={this.handleItemClick}>
                                    Корзина
                                    <Label color={cart.count > 0 ? 'green' : null}>
                                        {cart.count}
                                    </Label>
                                </Menu.Item>
                            }
                            content={cart.count > 0 ? cart.items.map((phone) => <Cart test={this.props} key={phone.id} {...phone} />) : 'Ваша корзина пуста'}
                            on="click"
                            hideOnScroll
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}

const mapStateToProps = ({ cart }) => ({
    totalPrice: cart.items.reduce((total, phone) => total + phone.price, 0),
    count: cart.items.length,
    items: uniqBy(cart.items, o => o.id),
});

const mapDispatchToProps = dispatch => ({
    addToCart: phone => {
        return dispatch(addToCart(phone));
    },
    removeFromCart: id => {
        return dispatch(removeFromCart(id));
    }

});


export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);