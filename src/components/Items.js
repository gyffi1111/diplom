import React, { Component } from 'react';
import { connect } from "react-redux";
import { setPhones } from '../actions/phones';
import axios from 'axios';
import Item from './Item';
import { Container, CardGroup, Pagination } from "semantic-ui-react";

class Items extends Component
{
    componentWillMount() {
        const { setPhones } = this.props;

        axios.get('/phones.json').then(({ data }) => {
            setPhones(data);
        });
    }

    render() {
        const { phones, isLoading } = this.props;

        let items = isLoading ? phones.map((value) => {
            return (
                <Item key={value.id} item={value}/>
            );
        }) : 'Loading...';

        return (
            <Container>
                <CardGroup itemsPerRow={4}>
                    { items }
                </CardGroup>

            </Container>
        );
    }
}

const mapStateToProps = ({ phones }) => ({
    phones: phones.items,
    isLoading: phones.isLoading
});

const mapDispatchToProps = dispatch => ({
    setPhones: phones => dispatch(setPhones(phones))
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);