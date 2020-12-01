import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import { routes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import { Login, ConfigureTask, Tasks } from "screens";


export const Routes: React.FC = () => {
    const location = useLocation();

    return (
        <Switch>
            <Route path={`/${routes.LOGIN}`} exact component={Login} />
            <PrivateRoute path={`/${routes.TASKS}`} component={Tasks} />
            <PrivateRoute path={`/${routes.CONFIGURE_TASKS}/:taskId`} component={ConfigureTask} />

            <Redirect to={{ pathname: `/${routes.LOGIN}`, state: { from: location} }} />
        </Switch>
    );
}



export function RouterNode() {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default RouterNode;