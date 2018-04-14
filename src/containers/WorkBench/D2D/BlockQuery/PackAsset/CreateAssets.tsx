import * as React from 'react';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { UploadForm } from 'components';
import { parseRadio, parseSelect, parseDatePicker, parseInput } from 'utils/Form';
import { uploadFileUrl } from 'actions/file';
import { createAsset } from 'config/form';

interface Props extends FormComponentProps {
    onSubmit: (value: any) => void;
}

class CreateAssets extends React.Component<Props, any> {
    onSubmit = e => {
        e.preventDefault()
        let { form: { validateFields }, onSubmit } = this.props;
        validateFields((err, value) => err ? null : onSubmit(value))
    }

    onUploadFinish = (id, info) => {
        let { file: { response }} = info;
        console.log(id, response)
        let { form: { validateFields }} = this.props;
        validateFields((err, value) => {
            console.log(value);
        })
    }

    parseConfig = config => {
        let {
            id,
            domType = '',
        } = config;
        const { form } = this.props;
        switch (domType) {
            case 'upload':
                let { files } = config;
                return (
                    <UploadForm
                        key={id}
                        configs={files}
                        action={uploadFileUrl}
                        form={form}
                    />
                );
            case 'radio': return parseRadio(config, form);
            case 'select': return parseSelect(config, form);
            case 'datePicker': return parseDatePicker(config, form);
            default: return parseInput(config, form);
        }
    }
    render() {
        return (
            <Form>
                {createAsset.map( config => this.parseConfig(config))}
                <Button onClick={this.onSubmit}>创建</Button>
            </Form>
        )
    }
}

export default Form.create()(CreateAssets);
