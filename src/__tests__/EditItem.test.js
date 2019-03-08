import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EditForm from '../components/admin/EditForm';
import initStore from "../store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { Redirect } from "react-router-dom";
import {fromJS} from "immutable";

const store = initStore();
configure({ adapter: new Adapter() });

const phone = [
    {
        "id": 1,
        "title": "Honor 10 Lite 3GB/32GB HRX-LX1 (небесный голубой)",
        "company": "Huawei",
        "image": "https://content2.onliner.by/catalog/device/header/a74788a2592878496c6ccf1698961925.jpeg",
        "price": 499,
        "rating": 3
    }
];
let immutablePhone = fromJS(phone);

describe('Edit phone', function() {
    it ('Edit phone',()=>{
        let instance = mount(<Provider store={store}>
            <BrowserRouter>
                <EditForm itemOne={immutablePhone} />
            </BrowserRouter>
        </Provider>);

        expect(shallowToJson(instance)).toMatchSnapshot();

        let addingMock = ['testTitle', 'testCompany', 'http://test.loc/test.jpg', 123, 1];
        let addingNamesMock =['title', 'company', 'image', 'price', 'rating'];

        instance.find('.editPhoneForm').find('input').forEach((el, index)=>{
            el.simulate("change", { target: { value: addingMock[index], name: addingNamesMock[index]}});
        });

        instance.find('.editPhoneForm').find('.editPhone').at(0).simulate('click');
        expect(instance.containsMatchingElement(<Redirect to="/items" />)).toEqual(true);
    })

});
