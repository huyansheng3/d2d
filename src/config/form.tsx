const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const colx2 = {
    'span': 12
}

export const basicRegister = [{
    'id': 'mobile',
    'label': '经办人手机号',
    'rules': [{ required: true, message: '请输入手机号!' }],
    'inputType': 'text',
    'placeholder': '请输入手机号',
    'icon': 'mobile',
}, {
    'id': 'verifyCode',
    'label': '验证码',
    'rules': [{ required: true, message: '请输入验证码!' }],
    'placeholder': '请输入验证码',
    'domType': 'verifyCode',
}, {
    'id': 'password',
    'label': '新密码',
    'rules': [{ required: true, message: '请输入新密码!' }],
    'inputType': 'password',
    'placeholder': '请输入密码',
    'icon': 'lock',
}, {
    'id': 'confirmPassword',
    'label': '确认密码',
    'rules': [{ required: true, message: '请再次输入密码二次验证!' }],
    'inputType': 'password',
    'placeholder': '请再次输入密码',
    'icon': 'lock',
}, {
    'id': 'mail',
    'label': '联系邮箱',
    'rules': [{ required: true, message: '请输入联系邮箱'}],
    'inputType': 'text',
    'placeholder': '请输入邮箱',
    'icon': 'mail'
}, {
    'id': 'name',
    'label': '经办人姓名',
    'rules': [{ required: true, message: '请输入经办人姓名'}],
    'inputType': 'text',
    'placeholder': '请输入经办人姓名',
    'icon': 'smile-o'
}, {
    'id': 'idNo',
    'label': '经办人身份证号',
    'rules': [{ required: true, message: '请输入经办人身份证号'}],
    'inputType': 'text',
    'placeholder': '请输入身份证号',
    'icon': 'credit-card'
}, {
    'id': 'idForm',
    'domType': 'upload',
    'files': [{
        'id': 'idAboveUrl',
        'label': '经办人身份证照片',
        'extra': '上传正面',
        'span': 9,
        'offset': 5,
        formItemLayout
    }, {
        'id': 'idBelowUrl',
        'extra': '上传背面',
        'span': 9,
        'offset': 0,
        'formItemLayout': {
        }
    }]
}, {
    'id': 'authorForm',
    'domType': 'upload',
    'files': [{
        'id': 'authorProtocoUrl',
        'label': '经办人授权协议(需加盖公章)',
        'extra': '上传授权协议',
        'span': 15,
        'offset': 3,
        formItemLayout
    }]
}]

export const corpRegister = [{
    'id': 'role',
    'label': '企业身份类型',
    'domType': 'radio',
    'initialValue': 'abc',
    'options': [{
        value: 'abc',
        title: '资金方'
    }, {
        value: 'de',
        title: '核心企业'
    }, {
        value: 'fg',
        title: '上游企业'
    }]
}, {
    'id': 'corpName',
    'label': '企业名称',
    'rules': [{ required: true, message: '请输入企业名称!' }],
    'colAttr': colx2
}, {
    'id': 'registeredAddress',
    'label': '企业注册地址',
    'rules': [{ required: true, message: '请输入企业注册地址!' }],
    'colAttr': colx2
}, {
    'id': 'residentAddress',
    'label': '企业常驻地址',
    'rules': [{ required: true, message: '请输入企业常驻地址!' }],
    'colAttr': colx2
}, {
    'id': 'property',
    'domType': 'select',
    'label': '企业性质',
    'initialValue': '11',
    'colAttr': colx2,
    'options': [{
        value: '11',
        title: '国有企业'
    }, {
        value: '22',
        title: '不知道哪儿的企业'
    }]
}, {
    'id': 'cityCode',
    'label': '企业归属城市',
    'rules': [{ required: true, message: '请输入企业归属城市!' }],
    'colAttr': colx2,
    'domType': 'cascader',
    'options': [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
                value: 'xihu',
                label: 'West Lake',
            }],
        }],
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
            }],
        }],
    }]
}, {
    'id': 'registeredCapital',
    'label': '注册资本(万元)',
    'rules': [{ required: true, message: '请输入企业注册资本!' }],
    'colAttr': colx2
}, {
    'id': 'foundedDate',
    'label': '成立日期',
    'domType': 'datePicker',
    'rules': [{ required: true, message: '请输入企业成立日期!' }],
    'colAttr': colx2
}, {
    'id': 'industrialCode',
    'label': '所在行业',
    'rules': [{ required: true, message: '请输入企业所在行业!' }],
    'colAttr': colx2,
    'domType': 'select',
    'options': [{
        value: 'A',
        title: '农业'
    }]
}]

export const createAsset = [{
    'id': 'upCompany',
    'label': '上游企业',
    /*
    'domType': 'radio',
    'initialValue': 'A',
    'options': [{
        value: 'A',
        title: 'A公司'
    }, {
        value: 'B',
        title: 'B公司'
    }, {
        value: 'C',
        title: 'C公司'
    }]
    */
}, {
    'id': 'invoiceType',
    'label': '发票类型',
    'domType': 'select',
    'initialValue': '1',
    'options': [{
        value: '1',
        title: '增值税专用发票'
    }, {
        value: '2',
        title: '增值税普通发票'
    }]
}, {
    'id': 'invoiceCode',
    'label': '发票代码'
}, {
    'id': 'invoiceNumber',
    'label': '发票号码'
}, {
    'id': 'amount',
    'label': '发票金额(不含税)'
}, {
    'id': 'billingDate',
    'label': '开票日期',
    'domType': 'datePicker'
}, {
    'id': 'payment',
    'label': '账期(天)'
}, {
    'id': 'electronic',
    'domType': 'upload',
    files: [{
        id: 'hashElectronic',
        'label': '上传发票',
    }]
}, {
    'id': 'trade',
    'domType': 'upload',
    files: [{
        id: 'hashTrade',
        'label': '上传合同'
    }]
}]

export default {
    basicRegister,
    corpRegister,
    createAsset
}
