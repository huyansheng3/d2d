import * as React from 'react';
import { Col, Form, Input, Radio, Select, Cascader, DatePicker, Icon } from 'antd';
import { VerifyCode } from 'components';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

interface InputConfig {
    id,
    rules,
    label?,
    inputType?,
    icon?,
    placeholder?,
    formItemLayout?,
    colAttr?,
}

interface ParseInput {
    (
        config: InputConfig,
        form: { getFieldDecorator },
    ): any;
}

export const parseInput: ParseInput = (config, form) => {
    let { getFieldDecorator } = form;
    let {
        id,
        rules,
        label = '',
        inputType = 'text',
        icon = '',
        placeholder = '',
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     rules
                })(
                     <Input
                         id={id}
                         type={inputType}
                         prefix={icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }}/> : null}
                         placeholder={placeholder} />
                 )}
            </FormItem>
        </Col>
    )
}

export const parseVerifyCode = (config, form) => {
    let { getFieldDecorator } = form;
    let {
        id,
        rules,
        label = '',
        onSend,
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     rules
                })(
                     <VerifyCode onSend={onSend}/>
                 )}
            </FormItem>
        </Col>
    )
}

export const parseRadio = (config, form) => {
    let { getFieldDecorator } = form;
    let {
        id,
        rules,
        label = '',
        options = [],
        initialValue = undefined,
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    const parseOption = ({value, title}) => (<Radio key={value} value={value}>{title}</Radio>)
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     initialValue,
                     rules
                })(
                     <RadioGroup>
                         {options.map( option => parseOption(option))}
                     </RadioGroup>
                 )}
            </FormItem>
        </Col>
    )
}

export const parseSelect = (config, form) => {
    let { getFieldDecorator } = form;
    let {
        id,
        rules,
        label = '',
        options = [],
        initialValue = undefined,
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    const parseOption = ({value, title}) => (<Option key={value} value={value}>{title}</Option>)
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     initialValue,
                     rules
                })(
                     <Select>
                         {options.map( option => parseOption(option))}
                     </Select>
                 )}
            </FormItem>
        </Col>
    )
}

export const parseDatePicker = (config, form) => {
    let {
        id,
        rules,
        label = '',
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    let { getFieldDecorator } = form;
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     rules
                })(
                     <DatePicker />
                )}
            </FormItem>
        </Col>
    )
}

export const parseCascader = (config, form) => {
    let { getFieldDecorator } = form;
    let {
        id,
        rules,
        label = '',
        options = [],
        formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        colAttr = {}
    } = config;
    return (
        <Col {...colAttr} key={id}>
            <FormItem key={id} label={label}
                      {...formItemLayout}>
                {getFieldDecorator(id, {
                     rules
                })(
                     <Cascader options={options} changeOnSelect/>
                 )}
            </FormItem>
        </Col>
    )
}
