import { wrapServer } from 'utils/Axios';
 
export enum ACTION_TYPE {
    QUERY = 'ENTERPRISE_QUERY'
}

export const query = data => {
    return {
        type: ACTION_TYPE.QUERY,
        promise: wrapServer({
            method: 'get',
            url: '/enterprise/all',
            data
        })
    }
}

export default {
    ACTION_TYPE,
    query
}
