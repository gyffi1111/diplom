import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => (
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

            <Menu.Menu position='right'>
                <Menu.Item name='signup'>
                    Итого: &nbsp; <b>0</b> &nbsp; руб.
                </Menu.Item>

                <Menu.Item name='cart'>
                    Корзина (0)
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    </Segment>
);

export default MainMenu;