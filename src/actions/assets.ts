import { wrapServer } from 'utils/Axios';
 
export enum ACTION_TYPE {
    QUERY = 'ASSETS_QUERY',
    CREATE = 'ASSETS_CREATE',
}

export const query = data => {
    return {
        type: ACTION_TYPE.QUERY,
        promise: wrapServer({
            method: 'get',
            url: '/assets?status=created',
            data
        })
    }
}

export const create = data => {
    return {
        type: ACTION_TYPE.CREATE,
        promise: wrapServer({
            method: 'post',
            url: '/assets?organisation=PartyB&locality=New York&country=US',
            data: {
                ...data,
                type: '1',
                id: Math.random().toString().slice(15),
                invoice: 'balabala',
                owner: 'A',
                status: 'create',
                coreCompany: 'core'
            }
        })
    }
}

export default {
    ACTION_TYPE,
    query
}
