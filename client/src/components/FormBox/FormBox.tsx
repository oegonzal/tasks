import React, { useState } from "react";
import { InputFields, KeyValue } from "types";
import { StyledFormBox } from "./FormBox.styled";

interface Props {
    title: string;
    inputs: Array<InputFields>;
    btnText: string;
    onClick: Function;
}

//  Generic & flexible - npm module, presentational compt - meant to have container for custom prop logic.
const InputBox: React.FC<Props> = ({ title, inputs, onClick, btnText }) => {
    const [inputFields, setInputFields] = useState<KeyValue>( () => inputs.reduce((acc, inp) => 
        ({ ...acc, [inp.name]: inp.value}), {}) );

    function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick({ input: inputFields });
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }

    return (
      <StyledFormBox>
          {title && <h3>{title}</h3>}
          {inputs && inputs.map((input, index) => {
              return (
                  <input key={index} type={input.type} placeholder={input.placeholder} 
                    name={input.name} onChange={onInputChange} value={inputFields[input.name] || input.value} />
              )
          })}
          {btnText && <button onClick={onSubmit}>{btnText}</button>}
      </StyledFormBox>
    );
}

export default InputBox;