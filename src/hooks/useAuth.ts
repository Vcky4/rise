import { useApi } from "../network/ApiClient";
import { getUrl } from "../network/Endpoints";
import IUser from "../network/models/IUser";

export function useAuth() {
    const api = useApi()

    //login
    const login = (data: {
        email_address: string;
        password: string;
    }) => {
        return api.post<IUser & {
            token: string
        }>(getUrl('session'), data)
    }

    //sign up
    const signUp = (data: {
        email_address: string;
        first_name: string;
        last_name: string;
        username: string | null;
        date_of_birth: string,
        phone_number: string
    }) => {
        return api.post<IUser>(getUrl('register'), data)
    }


    // get session 
    const getSession = () => {
        return api.get<IUser>(getUrl('session'))
    }

    return {
        login,
        getSession,
        signUp,
    }
}