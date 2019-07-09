import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import HomePage from "./components/pages/homepage";
import FavoritePage from "./components/pages/favoritepage";
import UserLoginPage from "./components/pages/user-login";
import UserSignupPage from "./components/pages/signup-page";

function App() {
    return (
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/home"} component={HomePage}/>
            <Route exact path={"/favorite"} component={FavoritePage}/>
            <Route exact path={"/login"} component={UserLoginPage}/>
            <Route exact path={"/signup"} component={UserSignupPage}/>
        </Switch>
    );
}

export default App;
