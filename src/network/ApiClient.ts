import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


class ApiClient {
    private static instance: ApiClient;
    headers: { [key: string]: string } = {};
    private constructor(token: string | null) {
        // initialization code

        //set request headers
        this.headers['Content-Type'] = 'application/json';
        //set token
        if (!!token) {
            this.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    public static getInstance(token: string | null) {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient(token);
        }
        return ApiClient.instance;
    }

    private async request<T>(
        url: string,
        body: any,
        method: 'PUT' | 'GET' | 'POST' | 'PATCH' | 'DELETE'
    ): Promise<{ res: Response; data: T | null; err?: any }> {
        return fetch(url, {
            method,
            headers: this.headers,
            body
        }).then(async res => {
            const data = res.ok ? await res.json() as T : null;
            const err = !res.ok ? await res?.json() : null;
            return {
                res,
                data,
                err
            };
        }).catch(err => {
            return {
                res: { ok: false } as Response,
                data: null,
                err
            };
        });
    }

    public async get<T>(url: string): Promise<{ res: Response; data: T | null; err?: any }> {
        return this.request<T>(url, undefined, 'GET');
    }

    public async post<T>(url: string, data: any): Promise<{ res: Response; data: T | null; err?: any }> {
        return this.request<T>(url, JSON.stringify(data), 'POST');
    }

    public async put<T>(url: string, data: any): Promise<{ res: Response; data: T | null; err?: any }> {
        return this.request<T>(url, JSON.stringify(data), 'PUT');
    }

    public async delete<T>(url: string, data?: any): Promise<{ res: Response; data: T | null; err?: any }> {
        return this.request<T>(url, data, 'DELETE');
    }

    public async patch<T>(url: string, data: any): Promise<{ res: Response; data: T | null; err?: any }> {
        return this.request<T>(url, JSON.stringify(data), 'PATCH');
    }

    public async upload<T>(url: string, data: FormData): Promise<{ res: Response; data: T | null; err?: any }> {
        return fetch(url, {
            method: 'POST',
            headers: {
                ...this.headers,
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(async res => {
                const responseData = res.ok ? await res.json() : null;
                return {
                    res,
                    data: responseData,
                };
            })
            .catch(err => {
                return {
                    res: { ok: false } as Response,
                    data: null,
                    err,
                };
            });
    }
}

export const useApi = () => {
    const { token } = useContext(AuthContext);
    return ApiClient.getInstance(token);
}