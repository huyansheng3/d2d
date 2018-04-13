import { server } from 'utils/Axios';

export enum ACTION_TYPE {
    QUERY = 'MARKET_QUERY'
}

export const query = data => {
    return {
        type: ACTION_TYPE.QUERY,
        promise: server.request({
            method: 'post',
            url: '/market/query/',
            data
        })
    }
}

export default {
    ACTION_TYPE,
    query
}
