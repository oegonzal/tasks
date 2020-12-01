import styled from 'styled-components';

interface Props { }

export const StyledTask = styled.div<Props>`
    display: flex;
    flexDirection: row;
    justify-content: space-between;
    padding: 15px;
    border: 2px solid black;
    margin: 5px 15px;

    &:hover {
        background-color: #EAEAEA;
    }

    div > h5 {
        margin: 0;
    }

    div:nth-of-type(1) {
        width: 5%;
    }

    div:nth-of-type(2) {
        width: 75%;
    }

    div:nth-of-type(3) {
        width: 20%;
        display: flex;
        justify-content: flex-end;
    }
`;