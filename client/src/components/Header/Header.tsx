import React from "react";
import { api } from "services";
import { routes } from "navigation";
import { useHistory } from "react-router-dom";
import { StyledHeader } from "./Header.styled";

interface Props {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}

const Header: React.FC<Props> = ({ left, center, right  }) => {
    const history = useHistory();

    async function logout() {
        const { data } = await api.fetchBase({ path: `/logout`, method: 'POST' });
        if (data) {
            if (data) history.push(`/${routes.LOGIN}`);
        }
    }

    return (
        <StyledHeader>
            <div>
                {left}
            </div>
            <div>
                {center ?? <h1>Task Manager</h1>}
            </div>
            <div>
                {right ?? <a onClick={logout}>Logout</a>}
            </div>
        </StyledHeader>
    );
}

export default Header;