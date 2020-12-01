import styled from 'styled-components';

interface Props { }

export const StyledTasksPage = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 85%;
    width: 80%;
    
    & > div {
        display: flex;
        flex-direction: column;
        overflow: auto;
        border: 1px #dcdcdc solid;
        
        max-height: 70%;
        width: 100%;
    }

    & > button {
        align-self: flex-start;
        margin-top: 25px;
        background: ${({ theme }) => theme.button.background};
    }
`;