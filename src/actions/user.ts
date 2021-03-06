import { wrapServer } from 'utils/Axios';
import api from 'config/api';

export enum ACTION_TYPE {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  SEND_VERIFY = 'SEND_VERIFY',
  QUERY_USERS = 'QUERY_USERS',
  CREATE_USER = 'CREATE_USER',
  SET_USER = 'SET_USER',
}

export enum SMS_TYPE {
  SIGNUP = 'SIGNUP',
  PASSWORD_RESET = 'PASSWORD_RESET',
  ORDER_PAYMENT = 'ORDER_PAYMENT',
  LOGIN = 'LOGIN',
}

export const login = data => {
  return {
    type: ACTION_TYPE.LOGIN,
    promise: wrapServer({
      url: api.login,
      data,
    }),
  };
};

export const logout = () => {
  return {
    type: ACTION_TYPE.LOGOUT,
    promise: wrapServer({ url: api.logout }),
  };
};

export const register = data => {
  let {
    mobile,
    verifyCode,
    password,
    confirmPassword,
    mail,
    name,
    idNo,
    idAboveUrl,
    idBelowUrl,
    role,
    corpName,
    registeredAddress,
    residentAddress,
    property,
    cityCode,
    registeredCapital,
    foundedDate,
    industrialCode,
  } = data;
  return {
    type: ACTION_TYPE.REGISTER,
    promise: wrapServer({
      url: '/corp/register/',
      data: {
        corpBasicDto: {
          cityCode,
          corpName,
          foundedDate,
          industrialCode,
          property,
          registeredAddress,
          registeredCapital,
          residentAddress,
          role,
        },
        operatorDto: {
          agree: 'Y',
          confirmPassword,
          idAboveUrl,
          idBelowUrl,
          idNo,
          mail,
          mobile,
          name,
          password,
          verifyCode,
        },
      },
    }),
  };
};

export const sendVerifyCode = data => ({});

export const queryUsers = ({ data }) => {
  return {
    type: ACTION_TYPE.QUERY_USERS,
    promise: wrapServer({
      method: 'get',
      url: '/user/users',
      data,
    }),
  };
};

export const setUser = data => {
  return {
    type: ACTION_TYPE.SET_USER,
    data: data,
  };
};

export const createUser = ({ data }) => {
  return {
    type: ACTION_TYPE.CREATE_USER,
    promise: wrapServer({
      method: 'post',
      url: '/user/users',
      data,
    }),
  };
};

export default {
  ACTION_TYPE,
  SMS_TYPE,
  login,
  register,
  sendVerifyCode,
};
