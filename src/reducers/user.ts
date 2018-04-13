import { handle } from 'redux-pack';
import { STORAGE_KEY, initState } from 'utils/Storage';
import { USER } from 'actions';
const { ACTION_TYPE } = USER;

export default (state = initState(STORAGE_KEY.USER), action) => {
    switch (action.type) {
    case ACTION_TYPE.LOGIN:
        return handle(state, action, {
            start: prevState => prevState,
            success: prevState => ({...prevState, ...action.payload.data})
        });
    case ACTION_TYPE.LOGOUT:
        return {};
    default: return state;
    }
}
