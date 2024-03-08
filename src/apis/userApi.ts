import { appInfo } from '../constants/appInfos';
import axiosClient from './axiosClient';

class userApi {
    HandleUser = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/users${url}`, {
            method: method ?? 'get',
            data,
        });
    };
}

const userAPI = new userApi();
export default userAPI;