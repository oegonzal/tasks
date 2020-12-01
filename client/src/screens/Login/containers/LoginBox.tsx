import React from "react";
import { InputFields } from "types";
import { FormBox } from "components";

interface Props {
    onClick: Function;
}

const inputFields: Array<InputFields> = [
    { type: 'text', placeholder: 'email', name: 'email', value: 'oegonbar@gmail.com' }, 
    { type: 'password', placeholder: 'password', name: 'password', value: 'q1w2e3r4' }
]; 

const LoginBox: React.FC<Props> = ({ onClick }) => {
    return (
        <FormBox title={"Log in"} btnText={"Log in"} onClick={onClick} inputs={inputFields} />
    );
}

export default LoginBox;