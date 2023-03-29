import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";

//данный тест для проверки работоспособности компоненты <App/> в целом, все ли ок с ней
//важно, чтобы передаваемая сюда компонента уже была обернута в Provider и BrowserRouter (см. App.tsx)
it('renders without crashing', () => {
    const div = document.createElement('div'); //создается дивка
    ReactDOM.render(<SamuraiJSApp/>, div); //внутрь нее рендерится наша App (SamuraiJSApp) компонента
    ReactDOM.unmountComponentAtNode(div) //зачистка мусора и демонтаж из дивки компоненты App (SamuraiJSApp)
})

