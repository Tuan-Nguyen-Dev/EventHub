import { appInfo } from '../constants/appInfos';
import axiosClient from './axiosClient';

class EventApi {
    HandleEvent = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/events${url}`, {
            method: method ?? 'get',
            data,
        });
    };
}

const eventAPI = new EventApi();
export default eventAPI;