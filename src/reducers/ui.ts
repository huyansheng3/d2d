import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'utils/Loading';

const initState = {
  loading: {},
  isLoading: false,
};

let loadingCount = 0;

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LOADING_BEGIN:
      loadingCount += 1;
      return {
        ...initState,
        loading: { ...initState.loading, [action.key]: true },
        isLoading: Boolean(loadingCount),
      };
    case ACTION_TYPE.SET_LOADING_FINISH:
      loadingCount -= 1;
      return {
        ...initState,
        loading: { ...initState.loading, [action.key]: false },
        isLoading: Boolean(loadingCount),
      };
    default:
      return state;
  }
};
