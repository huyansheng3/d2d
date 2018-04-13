import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import {
    Form,
    Input,
    Select,
    Button
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    //    labelCol: {
    //        xs: { span: 2 },
    //        sm: { span: 2 },
    //    },
    //    wrapperCol: {
    //        sm: { span: 4 },
    //    },
};
class QueryForm extends React.Component<FormComponentProps, {}> {
    query = e => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem
                    {...formItemLayout}
                    label=""
                >
                    {getFieldDecorator('mobile', {})(
                         <Input
                             id="mobile"
                             placeholder="账号/手机号"
                         />
                     )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {})(
                         <Input
                             id="name"
                             placeholder="用户姓名"
                         />
                     )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('status', {
                         initialValue: 'all',
                    })(
                         <Select style={{ width: 120 }}>
                             <Option value="jack">所有</Option>
                             <Option value="lucy">启用</Option>
                             <Option value="Yiminghe">禁用</Option>
                         </Select>
                     )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.query}>查询</Button>
                </FormItem>
                <FormItem>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(QueryForm);
