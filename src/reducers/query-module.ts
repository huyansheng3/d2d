import { handle } from 'redux-pack';
import { ACTION_TYPE } from 'actions/query-module';
import { findIndex, forEach, find } from 'lodash';
import produce from 'immer';

export const initState = {
  products: [],
  fileTypes: [],
  permission: [],
  permissionCurrent: [],
  nodeMainTain: [],
  corporateMap: {},
  tables: [],
  attachments: [],
  loading: {},
  apiList: [],
  verifyData: [],
  localHash: '',
  tableList: [],
  queryForm: {},
  onlineHashs: [],
  nodes: [],
  hashForm: {},
  currentKey: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY_PRODUCT:
      return handle(state, action, {
        success: prevState => {
          const products = action.payload.data || [];
          const filterProducts = products.filter(
            (item, index) =>
              findIndex(products, { prjNo: item.prjNo }) === index
          );
          return { ...prevState, products: filterProducts };
        },
      });
    case ACTION_TYPE.QUERY_FILE_TYPES:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, fileTypes: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_PERMISSION:
      return handle(state, action, {
        success: prevState => {
          const permission = action.payload.data || [];
          const product =
            find(state.products, { prjNo: +permission[0].pid }) || {};

          const tablesMap = state.tables.reduce((prev, curr: any) => {
            return {
              ...prev,
              [curr.type]: curr.productName,
            };
          }, {});

          const newPermission = permission.map(item => ({
            ...item,
            productName: product.prjName,
            apiName: tablesMap[item.tableName],
          }));
          return { ...prevState, permission: newPermission };
        },
        failure: prevState => {
          return { ...prevState, permission: [] };
        },
      });
    case ACTION_TYPE.QUERY_PERMISSION_CURRENT:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, permissionCurrent: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_NODE_MAIN_TAIN:
      return handle(state, action, {
        success: prevState => {
          const nodeMainTain = action.payload.data;
          let corporateMap = {};
          forEach(nodeMainTain, item => {
            corporateMap[item.partyName] = item;
          });
          return {
            ...prevState,
            nodeMainTain,
            corporateMap,
          };
        },
      });
    case ACTION_TYPE.QUERY_TABLES:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, tables: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_ATTACHMENTS:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, attachments: action.payload.data };
        },
      });
    case ACTION_TYPE.QUERY_API_LIST:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.QUERY_API_LIST]: true },
        }),
        success: prevState => {
          return { ...prevState, apiList: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_API_LIST]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_VERIFY_DATA:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_VERIFY_DATA]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, verifyData: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_VERIFY_DATA]: false,
            },
          };
        },
      });

    case ACTION_TYPE.SET_CURRENT_KEY:
      return { ...state, currentKey: action.key };
    case ACTION_TYPE.CALCULATE_HASH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: { ...prevState.loading, [ACTION_TYPE.CALCULATE_HASH]: true },
        }),
        success: prevState => {
          const localHash = action.payload.data;
          const index = findIndex(prevState.verifyData, item => {
            return item.data.contNo === prevState.currentKey;
          });
          const newVerifyData = produce(prevState.verifyData, draft => {
            draft[index].localHash = localHash;
          });
          return {
            ...prevState,
            verifyData: newVerifyData,
            localHash,
          };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.CALCULATE_HASH]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_TABLE_LIST:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_TABLE_LIST]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, tableList: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_TABLE_LIST]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_HASH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: {
            ...prevState.loading,
            [ACTION_TYPE.QUERY_HASH]: true,
          },
        }),
        success: prevState => {
          return { ...prevState, onlineHashs: action.payload.data };
        },
        finish: prevState => {
          return {
            ...prevState,
            loading: {
              ...prevState.loading,
              [ACTION_TYPE.QUERY_HASH]: false,
            },
          };
        },
      });
    case ACTION_TYPE.QUERY_NODE:
      return handle(state, action, {
        success: prevState => {
          return { ...prevState, nodes: action.payload.data };
        },
      });

    case ACTION_TYPE.CREATE_NODE:
      return handle(state, action, {
        success: prevState => {
          return {
            ...prevState,
            nodes: [...prevState.nodes, action.payload.data],
          };
        },
      });

    case ACTION_TYPE.UPDATE_NODE:
      return handle(state, action, {
        success: prevState => {
          const newNode = action.payload.data;
          const index = findIndex(prevState.nodes, { id: newNode.id });

          const newNodes = produce(prevState.nodes, draftNodes => {
            draftNodes[index] = newNode;
          });

          return {
            ...prevState,
            nodes: newNodes,
          };
        },
      });
    case ACTION_TYPE.SET_HASH_FORM:
      return { ...state, hashForm: { ...state.hashForm, ...action.payload } };
    default:
      return state;
  }
};
