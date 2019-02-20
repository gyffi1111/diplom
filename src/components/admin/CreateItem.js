import React, { Component } from 'react';
import { connect } from "react-redux";
import { setPhones, setStatusCreatePhone } from '../../actions/phones';
import { Container, Form as FormUI, Button, Header } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

class CreateItem extends Component
{
    state = {
        fields: {
            title: null,
            company: null,
            image: null,
            price: null,
            rating: null,
            id: null
        },
        errors: [
            {message: 'Oops!! цифры и буквы', status: false, statusEnd: false},
            {message: 'Oops!! цифры и буквы', status: false, statusEnd: false},
            {message: 'Oops!! url', status: false, statusEnd: false},
            {message: 'Oops!! цифры', status: false, statusEnd: false},
            {message: 'Oops!!! цифры', status: false, statusEnd: false}
        ],
        statusSaveBtn: false,
        redirect: false
    };

    fieldChange = (e, k = null) => {
        let keyItem = e.target.name;
        let valueItem = e.target.value;

        let newItems = {...this.state.fields};

        if (k !== null) {
            newItems[keyItem][k] = valueItem;
        } else {
            newItems[keyItem] = valueItem;
            newItems['id']= Math.round(30 - 0.5 + Math.random() * (100 - 30 + 1));
        }

        this.setState({fields: newItems, statusSaveBtn: true}, () => {
            this.checkValidate(keyItem, valueItem)
        });

    };

    checkValidate = (name, value) => {
        let errors = [...this.state.errors];

        switch (name) {
            case 'title':
                if (/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/.test(value)) {
                    errors[0].status = false;
                    errors[0].statusEnd = true;
                    this.setState({errors: errors})
                } else {
                    errors[0].status = true;
                    errors[0].statusEnd = false;
                    this.setState({errors: errors})
                }
                break;
            case 'company':
                if (/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/.test(value)) {
                    errors[1].status = false;
                    errors[1].statusEnd = true;
                    this.setState({errors: errors})
                } else {
                    errors[1].status = true;
                    errors[1].statusEnd = false;
                    this.setState({errors: errors})
                }
                break;
            case 'image':
                if (/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(value)) {
                    errors[2].status = false;
                    errors[2].statusEnd = true;
                    this.setState({errors: errors})
                } else {
                    errors[2].status = true;
                    errors[2].statusEnd = false;
                    this.setState({errors: errors})
                }
                break;
            case 'price':
                if (/^\d+$/.test(value)) {
                    errors[3].status = false;
                    errors[3].statusEnd = true;
                    this.setState({errors: errors})
                } else {
                    errors[3].status = true;
                    errors[3].statusEnd = false;
                    this.setState({errors: errors})
                }
                break;
            case 'rating':
                if (/^\d+$/.test(value)) {
                    errors[4].status = false;
                    errors[4].statusEnd = true;
                    this.setState({errors: errors})
                } else {
                    errors[4].status = true;
                    errors[4].statusEnd = false;
                    this.setState({errors: errors})
                }
                break;
            default:
                break;
        }

        this.checkStatusEnableBtn();
    };

    checkStatusEnableBtn = () => {
        let errors = [...this.state.errors];
        let checkStatusEnableBtn = errors.filter ((e) => {
            return e.statusEnd === true
        });

        if (checkStatusEnableBtn.length !== 5) {
            this.setState ({statusSaveBtn: false});
        } else {
            this.setState ({statusSaveBtn: true});
        }

    };

    saveItem = () => {
        const { setPhones } = this.props;
        const { setStatusCreatePhone } = this.props;

        setStatusCreatePhone(true);
        setPhones([...this.props.phones, this.state.fields]);
        this.setState({redirect: true});
    };

    setRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/items" />
        }

        return null;
    };


    render() {
        return (
            <Container>
                <Header as='h2'>Добавление нового продукта</Header>

                <FormUI>
                    <FormUI.Input name="title" label="Название" placeholder="Название"
                                  error={(this.state.errors[0].status === true) ? true: null}
                                  onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[0].status === true) ? (<span className="text-danger">{this.state.errors[0].message}</span>): null}

                    <FormUI.Input name="company" label="Компания" placeholder="Компания"
                                  error={(this.state.errors[1].status === true) ? true: null}
                                  onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[1].status === true) ? (<span className="text-danger">{this.state.errors[1].message}</span>): null}

                    <FormUI.Input name="image" label="Изображение" placeholder="Изображение"
                                  error={(this.state.errors[2].status === true) ? true: null}
                                  onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[2].status === true) ? (<span className="text-danger">{this.state.errors[2].message}</span>): null}

                    <FormUI.Input name="price" label="Цена" placeholder="Цена"
                                  error={(this.state.errors[3].status === true) ? true: null}
                                  onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[3].status === true) ? (<span className="text-danger">{this.state.errors[3].message}</span>): null}

                    <FormUI.Input name="rating" label="Рейтинг" placeholder="Рейтинг"
                                  error={(this.state.errors[4].status === true) ? true: null}
                                  onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[4].status === true) ? (<span className="text-danger">{this.state.errors[4].message}</span>): null}

                    {this.setRedirect()}
                    <Button disabled={!this.state.statusSaveBtn} onClick={this.state.statusSaveBtn ? this.saveItem : null} primary>Сохранить</Button>
                </FormUI>
            </Container>
        );
    }
}

const mapStateToProps = ({ phones }) => {
    return {
        phones: phones.items,
        isLoading: phones.isLoading
    }
};

const mapDispatchToProps = dispatch => ({
    setStatusCreatePhone: status => {
        return dispatch(setStatusCreatePhone(status));
    },
    setPhones: phones => {
        return dispatch(setPhones(phones));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);

