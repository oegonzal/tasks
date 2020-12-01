import React, { useState, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { ApiResponse } from "types";
import { LOGIN } from "actions";
import InputBox from './containers/LoginBox';
import { AppContext } from "AppContext";
import { useAuthenticateRequest } from "hooks";
import { StyledLoginPage } from "./Login.styled";
import { routes } from "navigation/routes";

export default function LoginPage() {
    const { dispatch } = useContext(AppContext);
    const location = useLocation();
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const { authenticate } = useAuthenticateRequest();

    async function login( { input }: { input: Object } ) {
        const { data }: ApiResponse = await authenticate(input);
        
        if (data) {
            dispatch({ type: LOGIN, meta: data?.data || {} })
            setRedirectToReferrer(true)
        }
    };

    if (redirectToReferrer) {
        return <Redirect to={{ pathname: `/${routes.TASKS}`, state: { from: location} }} />;
    }

    return (
        <StyledLoginPage>
            <InputBox onClick={login} />
        </StyledLoginPage>
    );
}
