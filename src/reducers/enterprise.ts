import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/enterprise';

export default (state = {}, action) => {
    switch (action.type) {
    case ACTION_TYPE.QUERY:
        return handle(state, action, {
            start: prevState => prevState,
            success: prevState => ({...prevState, ...action.payload.data})
        });
    default: return state;
    }
}
