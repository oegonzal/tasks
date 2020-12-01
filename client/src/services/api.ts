import { BASE_URL } from "config";
import { ApiResponse, RequestConfig } from "types" 


export const fetchBase = async ({ path, ...options }: RequestConfig): Promise<ApiResponse> => {
    const fetchOptions = await getFetchOptions(options);
    const prm =
        fetch(`${BASE_URL}${path || ''}`, fetchOptions || {})
            .then(handleErrors)
            .then(
                data => ({ data, error: null }),
                error => ({ data: null, error })
            );
    return prm;
};

function handleErrors(resp: any) {
    let json = resp.json();
    if (resp.status >= 200 && resp.status < 300) {
        return json;
    } else {
        return json.then(Promise.reject.bind(Promise));
    }
}

async function getFetchOptions(params: any) {
    const options: any = {
        method: params.method || 'GET',
        headers: Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': params.authorization || '',
        }, params.headers),
        credentials: params.credentials || 'include',
    };

    if (params.body) {
        options.body = JSON.stringify(params.body);
    }

    return options;
}