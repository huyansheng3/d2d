import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/account-manager';
import { findIndex, forEach } from 'lodash';
import update from 'immutability-helper';

export const initState = {
  roles: [],
  corporateInfo: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY_ROLES:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, roles: action.payload.data };
        },
      });
    case ACTION_TYPE.CREATE_ROLE:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            roles: [...prevState.roles, action.payload.data],
          };
        },
      });
    case ACTION_TYPE.UPDATE_ROLE_STATUS:
      return handle(state, action, {
        success: prevState => {
          const newRole = action.payload.data;
          const index = findIndex(prevState.roles, { id: newRole.id });
          const newRoles = update(prevState.roles, {
            $splice: [[index, 1, newRole]],
          });
          return {
            ...prevState,
            roles: newRoles,
          };
        },
      });
    case ACTION_TYPE.QUERY_CORPORATE:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            corporateInfo: action.payload.data,
          };
        },
      });
    default:
      return state;
  }
};
