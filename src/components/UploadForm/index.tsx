import * as React from 'react';
import { Form, Upload, Row, Col, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;
// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }
// const uploadButton = (title = '点击上传') => (
//     <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">{title ? title : '点击上传'}</div>
//     </div>
// )

interface Props extends FormComponentProps {
    configs: any,
    action: string,
}

export default class UploadForm extends React.Component<Props, {}> {
    normFile = e => {
        return e.file.response
    }

    parseConfig = config => {
        const { id, label, extra, span, offset, formItemLayout } = config;
        const { action } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Col key={id} span={span} offset={offset}>
                <FormItem key={id} label={label}
                          {...formItemLayout}
                          extra={extra}
                >
                    {getFieldDecorator(id, {
                         valuePropName: 'file',
                         getValueFromEvent: this.normFile,
                    })(
                         <Upload
                             name="file"
                             className="avatar-uploader"
                             action={action}
                             data={file => ({ file })}
                             >
                             <Button>
                                 <Icon type="upload" /> Click to Upload
                             </Button>
                         </Upload>
                     )}
                </FormItem>
            </Col>
        )
    }

    render() {
        const { configs } = this.props;
        return (
            <Row>
                {configs.map( config => this.parseConfig(config))}
            </Row>

        )
    }
}
