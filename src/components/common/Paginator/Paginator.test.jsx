import React from 'react';
import {create} from "react-test-renderer";
import Paginator from "./Paginator";


describe('Paginator component tests', () => {
    test('pages count is 11? but should be showed only 10', async () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>); //create фейково рендерит компоненту для теста
        const root = component.root;
        let spans = await root.findAllByType('span')
        expect(spans.length).toBe(10)
    })
})