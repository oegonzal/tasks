import styled from 'styled-components';

interface Props { }

export const StyledFormBox = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: black 2px solid;
    padding: 20px;
    height: 30%;
    width: 30%;
    
    input {
        margin: 5px;
        width: 100%;
    }

    button {
        margin-top: 20px;
        width: 100%;
        background-color: ${({ theme }) => theme.button.background};
    }
`;