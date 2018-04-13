import { server } from 'utils/Axios';

export enum ACTION_TYPE {
    BANNER = 'BANNER'
}

export const pullPhoto = value => {
    return {
        type: ACTION_TYPE.BANNER,
        promise: server.request({
            method: 'post',
            url: '/banner/'
        })
    }
};

export default {
    ACTION_TYPE,
    pullPhoto
}
