import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "../Links/Links";
import {DetailPage} from "../DetailPage/DetailPage";
import {CreatePage} from "../CreatePage/CreatePage";
import {AuthPage} from "../Auth/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <div>
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Route path="/"/>
            </Switch>
        </div>
    )
}