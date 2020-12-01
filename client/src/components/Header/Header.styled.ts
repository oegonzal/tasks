import styled from 'styled-components';

interface Props { }

export const StyledHeader = styled.header<Props>`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    width: 100%;

    div:nth-child(1) {
        flex-grow: 1;
    }

    div:nth-child(2) {
        flex-grow: 4;
    }

    div:nth-child(3) {
        flex-grow: 1;

        & > a {
            cursor: pointer;
        }
    }
`;