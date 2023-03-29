import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";
import {logDOM} from "@testing-library/react";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>); //create фейково рендерит компоненту для теста
        const instance = component.getInstance(); //дает экземпляр созданного от классовой компоненты объекта
        // @ts-ignore
        expect(instance.state.status).toBe('it-kamasutra.com');//проверяем что в стейте инстанса есть указанный нами текст
    })
    test('after creation <span/> should be displayed', async () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = await root.findByType('span');
        expect(span).not.toBeNull();
    })
    // test('after creation <input/> shouldn`t be displayed', async () => {
    //     const component = create(<ProfileStatus status='it-kamasutra.com'/>);
    //     const root = component.root;
    //     let input = await root.findByType('input')
    //     console.log(input)
    //     expect(input).toThrow();
    // })
    test('after creation <span/> should contains correct status', async () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = await root.findByType('span');
        // eslint-disable-next-line testing-library/no-node-access
        expect(span.children[0]).toBe('it-kamasutra.com');
        // eslint-disable-next-line testing-library/no-node-access
        expect(span.children.length).toBe(1);
    })
    test('input should be displayed in editMode instead of span', async () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = await root.findByType('span');
        span.props.onDoubleClick();
        let input = await root.findByType('input');

        expect(input.props.value).toBe('it-kamasutra.com');

    })
    test('callback shoul be called', () => {
        const mockCallback = jest.fn();// с помощью данной функции можно отследить, был ли вызван коллбэк из пропсов, и сколько раз
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})