import React, {Component} from 'react';
import { connect } from "react-redux";
import {Container, Button, Icon, Table, Image, Reveal, Segment, Dimmer, Loader, Popup, Grid, Header} from 'semantic-ui-react';
import Pagination from '../../components/Pagination';
import {setIsLoadingList, setPhones} from "../../actions/phones";
import axios from "axios";
import { NavLink } from 'react-router-dom';

class Items extends Component
{
    constructor(props) {
        super(props);

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
        this.state = {
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    deleteItem = (id, e) => {
        e.stopPropagation();

        const { phones } = this.props;
        let items = phones.filter((v) => {
            if (v.id === id) {
                return false;
            } else {
                return true
            }
        });

        const { setPhones } = this.props;
        setPhones(items);

        this.setState({ open: false })
    };

    render() {
        const { phones, isLoading } = this.props;
        let isLoad = !isLoading ?
            <Segment>
                <Dimmer active>
                    <Loader size='big'>Загрузка...</Loader>
                </Dimmer>
            </Segment>
            : null;

        let items = isLoading ? this.state.pageOfItems.map((value) => {
            return (value.id ?
                <Table.Row key={value.id}>
                    <Table.Cell>
                        <Reveal animated='move right'>
                            <Reveal.Content visible>
                                <Image src='/images/square-image.png' size='small' />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Image src={value.image} size='small' />
                            </Reveal.Content>
                        </Reveal>
                    </Table.Cell>
                    <Table.Cell>{value.title}</Table.Cell>
                    <Table.Cell>{value.company}</Table.Cell>
                    <Table.Cell>{value.price}</Table.Cell>
                    <Table.Cell>{value.rating}</Table.Cell>
                    <Table.Cell>
                        <NavLink to={"/item/edit/" + value.id} activeClassName="SActivated">
                            <Icon link name='pencil alternate' />
                        </NavLink>
                        <Popup trigger={<button><Icon link name='trash alternate outline' /></button>} flowing hoverable>
                            <Grid centered divided columns={1}>
                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Уверены???</Header>
                                    <p>
                                        Удалить {value.title} ?
                                    </p>
                                    <Button color="red" onClick={(e) => {this.deleteItem(value.id, e)}}>Удалить</Button>
                                </Grid.Column>
                            </Grid>
                        </Popup>
                    </Table.Cell>
                </Table.Row>
                : null);
            }) : null;


        return (
            <div className="admin-list-item">
                {isLoad}
                <Container>
                    <Table celled compact definition>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell>Название</Table.HeaderCell>
                                <Table.HeaderCell>Компания</Table.HeaderCell>
                                <Table.HeaderCell>Цена</Table.HeaderCell>
                                <Table.HeaderCell>Рейтинг</Table.HeaderCell>
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>{items}</Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell colSpan='5'>
                                    <NavLink to="/item/create" activeClassName="SActivated">
                                        <Button floated='right' icon labelPosition='left' primary size='small'>
                                            <Icon name='plus circle' /> Добавить товар
                                        </Button>
                                    </NavLink>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>

                    <Pagination items={phones} onChangePage={this.onChangePage} />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ phones }) => {
    return {
        phones: phones.items,
        isLoading: phones.isLoading,
        isAddPhone: phones.isAddPhone,
        setLoading: phones.setLoading
    }
};

const mapDispatchToProps = dispatch => ({
    setPhones: phones => {
        return dispatch(setPhones(phones));
    },
    setIsLoadingList: setLoading => {
        return dispatch(setIsLoadingList(setLoading));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);