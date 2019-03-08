import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Items from '../components/admin/Items';
import {fromJS} from 'immutable'
import initStore from "../store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const store = initStore();
configure({ adapter: new Adapter() });

const phones = [
    {
        "id": 1,
        "title": "Honor 10 Lite 3GB/32GB HRX-LX1 (небесный голубой)",
        "company": "Huawei",
        "image": "https://content2.onliner.by/catalog/device/header/a74788a2592878496c6ccf1698961925.jpeg",
        "price": 499,
        "rating": 3
    },
    {
        "id": 2,
        "title": "Xiaomi Mi Mix 3 6GB/128G международная версия (черный)",
        "company": "Xiaomi",
        "image": "https://content2.onliner.by/catalog/device/header/7b809895488980811292228b9885292c.jpeg",
        "price": 1335,
        "rating": 5
    }
];

let immutablePhones = fromJS(phones)

describe('List items', function() {

    it ('view listing item',()=>{
        let instance = mount(<Provider store={store}>
            <BrowserRouter>
                <Items isLoading={true} isAddPhone={true} setLoading={true} pageOfItems={immutablePhones} phones={immutablePhones} />
            </BrowserRouter>
        </Provider>);

        expect(shallowToJson(instance)).toMatchSnapshot();
    })

});
