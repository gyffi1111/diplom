import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CreateItem from '../components/admin/CreateItem';
import initStore from "../store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { Redirect } from "react-router-dom";

const store = initStore();
configure({ adapter: new Adapter() });

describe('Adding new phone', function() {
    it ('Fill adding form and add new phone',()=>{
        let instance = mount(<Provider store={store}>
                <BrowserRouter>
                    <CreateItem />
                </BrowserRouter>
            </Provider>);

        expect(shallowToJson(instance)).toMatchSnapshot();

        let addingMock = ['testTitle', 'testCompany', 'http://test.loc/test.jpg', 123, 1];
        let addingNamesMock =['title', 'company', 'image', 'price', 'rating'];

        instance.find('.createPhoneForm').find('input').forEach((el, index)=>{
            el.simulate("change", { target: { value: addingMock[index], name: addingNamesMock[index]}});
        });

        instance.find('.createPhoneForm').find('.savePhone').at(0).simulate('click');
        expect(instance.containsMatchingElement(<Redirect to="/items" />)).toEqual(true);
    })

});
