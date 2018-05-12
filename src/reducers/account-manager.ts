import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/account-manager';
import { findIndex, forEach } from 'lodash';
import update from 'immutability-helper';
import produce from 'immer';

export const initState = {
  roles: [],
  corporateInfo: [],
  users: [],
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
    case ACTION_TYPE.UPDATE_ROLE:
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
    case ACTION_TYPE.UPDATE_ROLE_STATUS:
      return handle(state, action, {
        start: prevState => {
          const { payload = {} } = action;
          const { params } = payload as any;

          const { id } = params;
          const index = findIndex(prevState.roles, { id: id });

          const newRoles = update(prevState.roles, {
            [index]: newRole =>
              update(newRole, {
                enabledState: {
                  $set: !newRole.enabledState,
                },
              }),
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
    case ACTION_TYPE.QUERY_USERS:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, users: action.payload.data };
        },
      });
    case ACTION_TYPE.CREATE_USER:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            users: [...prevState.users, action.payload.data],
          };
        },
      });
    case ACTION_TYPE.UPDATE_USER_STATUS:
      return handle(state, action, {
        start: prevState => {
          const { payload = {} } = action;
          const { params } = payload as any;

          const { id } = params;
          const index = findIndex(prevState.users, { id: id });

          const newUsers = produce(prevState.users, draftUsers => {
            draftUsers[index].enabledState = !draftUsers[index].enabledState;
          });

          return {
            ...prevState,
            users: newUsers,
          };
        },
      });
    case ACTION_TYPE.UPDATE_USER:
      return handle(state, action, {
        success: prevState => {
          const newUser = action.payload.data;
          const index = findIndex(prevState.users, { id: newUser.id });

          const newUsers = produce(prevState.users, draftUsers => {
            draftUsers[index] = newUser;
          });

          return {
            ...prevState,
            users: newUsers,
          };
        },
      });
    default:
      return state;
  }
};
