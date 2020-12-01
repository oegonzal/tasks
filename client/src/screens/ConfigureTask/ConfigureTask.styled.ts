import styled from 'styled-components';

interface Props { }

export const StyledConfiguredTasksPage = styled.div<Props>`
    display: flex;
    flex-direction: column;
    
    label {
        margin-right: 10px;
        margin-bottom: 5px;
    }

    & > div {
        margin: 10px 0px;
    }

    & > .ConfiguredTaskPage__description {
        display: flex;
        flex-direction: column;
    }

    button {
        background-color: ${({ theme }) => theme.button.background};
    }
`;