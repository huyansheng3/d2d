import * as React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

interface Props extends FormComponentProps {
  queryBykeyfield: (data: any) => any;
}

class SearchForm extends React.Component<Props, {}> {
  handleSearch = value => {
    const type = this.props.form.getFieldValue('type');
    this.props.queryBykeyfield({
      [type]: value,
    });
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
            <Option key="blockHeight">区块高度</Option>
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
