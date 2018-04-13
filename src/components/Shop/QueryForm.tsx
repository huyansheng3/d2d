import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import {
    Form,
    DatePicker,
    InputNumber,
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
                    label="发布日期: "
                >
                    {getFieldDecorator('beginDate', {})(
                         <DatePicker />
                     )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator('endDate', {})(
                         <DatePicker />
                     )}
                </FormItem>
                <FormItem
                >
                    {getFieldDecorator('fundStart', {})(
                         <InputNumber min={0} step={0.01} />
                     )}
                </FormItem>
                <FormItem
                >
                    {getFieldDecorator('fundEnd', {})(
                         <InputNumber min={0} step={0.01} />
                     )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('selector', {
                         initialValue: 'Lucy',
                    })(
                         <Select style={{ width: 120 }}>
                             <Option value="jack">Jack</Option>
                             <Option value="lucy">Lucy</Option>
                             <Option value="Yiminghe">yiminghe</Option>
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
