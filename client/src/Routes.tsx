import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from "./pages/CreatePoint";

const Router = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/cadastrar" component={CreatePoint} ></Route>
        </BrowserRouter>
    );
}
export default Router;