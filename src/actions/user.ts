import { wrapServer } from 'utils/Axios';

export enum ACTION_TYPE {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    SEND_VERIFY = 'SEND_VERIFY'
}

export enum SMS_TYPE {
    SIGNUP = 'SIGNUP',
    PASSWORD_RESET = 'PASSWORD_RESET',
    ORDER_PAYMENT = 'ORDER_PAYMENT',
    LOGIN = 'LOGIN'
}

export const login = data => {
    data.phone = '13917263460'
    data.password = '123456'
    return {
        type: ACTION_TYPE.LOGIN,
        promise: wrapServer({
            url: '/login',
            data
        })
    }
};

export const logout = () => ({
    type: ACTION_TYPE.LOGOUT
})

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
        industrialCode
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
                    role
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
                    verifyCode
                }
            }
        })
    }
}

export const sendVerifyCode = data => ({})


export default {
    ACTION_TYPE,
    SMS_TYPE,
    login,
    register,
    sendVerifyCode,
}
