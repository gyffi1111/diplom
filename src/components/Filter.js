import React, { Component } from 'react';
import { Menu, Input } from "semantic-ui-react";

class Filter extends Component
{
    state = { activeItem: 'all' };

    handleItemClick = (e, { name }) => {
        const { setFilter } = this.props;

        this.setState({activeItem: name});
        setFilter(name);
    };

    handleItemSearch = (e) => {
        const value = e.target.value;
        const { setSearchQuery } = this.props;

        setSearchQuery(value);
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu vertical>
                <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
                    Все
                </Menu.Item>

                <Menu.Item name='popular' active={activeItem === 'popular'} onClick={this.handleItemClick}>
                    Популярные
                </Menu.Item>

                <Menu.Item name='price_dear' active={activeItem === 'price_dear'} onClick={this.handleItemClick}>
                    Цена(дорогие)
                </Menu.Item>

                <Menu.Item name='price_low' active={activeItem === 'price_low'} onClick={this.handleItemClick}>
                    Цена(дешевые)
                </Menu.Item>

                <Menu.Item>
                    <Input icon="search" onChange={(e) => this.handleItemSearch(e)} placeholder="Поиск по названию..."/>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Filter;