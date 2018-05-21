import * as React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import './index.css';
import api from 'config/api';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

interface Props extends FormComponentProps {
  search: (data: any) => any;
}

class SearchForm extends React.Component<Props, {}> {
  handleSearch = value => {
    const type = this.props.form.getFieldValue('type');
    let opts = {};
    switch (type) {
      case 'keyfield':
        opts = { url: api.getTransByKeyfiled, data: { [type]: value } };
        break;
      case 'tableName':
        opts = { url: api.getTransByTableName, data: { [type]: value } };
        break;
      case 'partyName':
        opts = { url: api.getTransByPartyName, data: { [type]: value } };
        break;
      default:
        opts = { url: api.getTransByKeyfiled, data: { [type]: value } };
    }

    this.props.search(opts);
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div className="hlayout__search">
        {getFieldDecorator('type', {
          initialValue: 'keyfield',
        })(
          <Select style={{ minWidth: 120 }}>
            <Option key="keyfield">数据主键</Option>
            <Option key="tableName">接口</Option>
            <Option key="partyName">上传者</Option>
          </Select>
        )}

        {getFieldDecorator('searchText', {})(
          <Search
            id="search"
            name="search"
            placeholder="请输入查询条件"
            onSearch={this.handleSearch}
            enterButton
            style={{ width: 200 }}
          />
        )}
      </div>
    );
  }
}

export default Form.create()(SearchForm);
