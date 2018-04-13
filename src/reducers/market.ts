import { handle } from 'redux-pack';
import { MARKET } from 'actions';
const { ACTION_TYPE } = MARKET;

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
