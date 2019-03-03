import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import {Container, Header, Form as FormUI, Button} from "semantic-ui-react";
import { connect } from "react-redux";
import {setPhones} from "../../actions/phones";

class EditForm extends Component
{
    state = {
        fields: this.props.itemOne,
        errors: [
            {message: 'Oops!! цифры и буквы', status: false, statusEnd: true},
            {message: 'Oops!! цифры и буквы', status: false, statusEnd: true},
            {message: 'Oops!! url', status: false, statusEnd: true},
            {message: 'Oops!! цифры', status: false, statusEnd: true},
            {message: 'Oops!!! цифры', status: false, statusEnd: true}
        ],
        statusSaveBtn: true,
        redirect: false
    }
    fieldChange = (e, k = null) => {
        let keyItem = e.target.name;
        let valueItem = e.target.value;

        let newItems = {...this.state.fields};

        if (k !== null) {
            newItems[keyItem][k] = valueItem;
        } else {
            newItems[keyItem] = valueItem;
        }

        this.setState({fields: newItems, statusSaveBtn: true}, () => {
            this.checkValidate(keyItem, valueItem);
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
        let item = this.state.fields;
        let newItems = [...this.props.phones];

        newItems = newItems.map((e) => {
            if (e.id === item.id) {
                return item;
            } else {
                return e;
            }
        });

        const { setPhones } = this.props;
        setPhones(newItems);

        this.setState({redirect: true});
    };

    setRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/items" />
        }

        return null;
    };

    render() {
        let item = this.state.fields;

        return (
            <Container>
                <Header as='h2'>Редактирование продукта {item.id}</Header>

                <FormUI>
                    <FormUI.Input name="title" label="Название" placeholder="Название" defaultValue={item.title}
                        error={(this.state.errors[0].status === true) ? true: null}
                        onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[0].status === true) ? (<span className="text-danger">{this.state.errors[0].message}</span>): null}

                    <FormUI.Input name="company" label="Категория" placeholder="Категория" defaultValue={item.company}
                        error={(this.state.errors[1].status === true) ? true: null}
                        onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[1].status === true) ? (<span className="text-danger">{this.state.errors[1].message}</span>): null}

                    <FormUI.Input name="image" label="Изображение" placeholder="Изображение" defaultValue={item.image}
                        error={(this.state.errors[2].status === true) ? true: null}
                        onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[2].status === true) ? (<span className="text-danger">{this.state.errors[2].message}</span>): null}

                    <FormUI.Input name="price" label="Цена" placeholder="Цена" defaultValue={item.price}
                        error={(this.state.errors[3].status === true) ? true: null}
                        onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[3].status === true) ? (<span className="text-danger">{this.state.errors[3].message}</span>): null}

                    <FormUI.Input name="rating" label="Рейтинг" placeholder="Рейтинг" defaultValue={item.rating}
                        error={(this.state.errors[4].status === true) ? true: null}
                        onChange={(e) => {this.fieldChange(e)}}
                    />
                    {(this.state.errors[4].status === true) ? (<span className="text-danger">{this.state.errors[4].message}</span>): null}

                    {this.setRedirect()}
                    <Button disabled={!this.state.statusSaveBtn} onClick={this.state.statusSaveBtn ? this.saveItem : null} primary>Сохранить</Button>
                </FormUI>
            </Container>
        )
    }
}

const mapStateToProps = ({ phones }) => {
    return {
        isLoading: phones.isLoading,
        isAddPhone: phones.isAddPhone
    }
};

const mapDispatchToProps = dispatch => ({
    setPhones: phones => {
        return dispatch(setPhones(phones));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);