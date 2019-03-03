import React, { Component } from 'react';
import { connect } from "react-redux";
import { setPhones, setIsLoadingList, setFilter, setSearchQuery } from '../actions/phones';
import axios from 'axios';
import Item from './Item';
import { Container, CardGroup, Segment, Dimmer, Loader, Grid } from "semantic-ui-react";
import Filter from './Filter';
import Pagination from "./Pagination";
import orderBy from 'lodash/orderBy';

class Items extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        const { setPhones } = this.props;
        const { setIsLoadingList } = this.props;

        if (!this.props.setLoading) {
            axios.get('/phones.json').then(({ data }) => {
                if (this.props.isAddPhone && this.props.phones.length > 0) {
                    setPhones([...data, this.props.phones[this.props.phones.length - 1]]);
                } else {
                    setPhones(data);
                }
                setIsLoadingList(true);
            });
        }
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        const { phones, isLoading, setFilter, setSearchQuery } = this.props;

        let items = isLoading ? this.state.pageOfItems.map((value) => {
            return (value.id ? <Item key={value.id} item={value}/> : null);
        }) : <Segment>
                <Dimmer active>
                    <Loader size='big'>Загрузка...</Loader>
                </Dimmer>
            </Segment>;

        return (
            <Container>
                <Grid className="item-lists">
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <CardGroup className="list-item" itemsPerRow={3}>
                                { items }
                            </CardGroup>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Filter setFilter={setFilter} setSearchQuery={setSearchQuery} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div style={{marginTop: 40}} />

                <Pagination items={phones} onChangePage={this.onChangePage} />
            </Container>
        );
    }
}

const sort = (phones, filterBy) => {
    switch (filterBy) {
        case 'all':
            return phones;
        case 'popular':
            return orderBy(phones, 'rating', 'desc');
        case 'price_dear':
            return orderBy(phones, 'price', 'desc');
        case 'price_low':
            return orderBy(phones, 'price', 'asc');
        default:
            return phones;
    }
};

const filterPhones = (phones, searchQuery) => phones.filter(
    o => {
        return o.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
        o.company.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0;
    }
);

const searchPhones = (phones, filterBy, searchQuery) => {
    return sort(filterPhones(phones, searchQuery), filterBy);
};

const mapStateToProps = ({ phones }) => {
    return {
        phones: searchPhones(phones.items, phones.filterBy, phones.searchQuery),
        isLoading: phones.isLoading,
        isAddPhone: phones.isAddPhone,
        setLoading: phones.setLoading,
        filterBy: phones.filterBy,
        searchQuery: phones.searchQuery
    }
};

const mapDispatchToProps = dispatch => ({
    setPhones: phones => {
        return dispatch(setPhones(phones));
    },
    setIsLoadingList: setLoading => {
        return dispatch(setIsLoadingList(setLoading));
    },
    setFilter: filterBy => {
        return dispatch(setFilter(filterBy));
    },
    setSearchQuery: searchQuery => {
        return dispatch(setSearchQuery(searchQuery))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);