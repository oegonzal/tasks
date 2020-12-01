import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { StyledPrivateRoutePage, Header, } from "components";
import { AppContext } from "AppContext";
import { routes } from "navigation/routes";

interface Props {
    component: any;
    [rest: string]: any;
}

//  More declarative & reusable
const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();

  return (
    <Route {...rest}>
      {state.userId ?
        <StyledPrivateRoutePage>
          <Header />
          <Component />
        </StyledPrivateRoutePage>
      :
        <Redirect to={{ pathname: `/${routes.LOGIN}`, state: { from: location } }} />
      }
    </Route>
  );
};

export default PrivateRoute;