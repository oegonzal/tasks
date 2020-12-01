import { useState } from "react";
import { api } from "services";
import { ApiResponse } from "types";

function useAuthenticateRequest() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function authenticate(body: Object): Promise<ApiResponse> {
        const result = await api.fetchBase({ path: '/login', method: 'POST', body });
        const { data, error } = result;

        setData(data);
        setError(error);
        return result;
    }

    return { authenticate, data, error }
}

export default useAuthenticateRequest;