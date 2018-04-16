import * as React from 'react';
import { connect } from 'react-redux';
import { apiColumns } from 'config/query-module';
import { Table } from 'antd';
import { queryApiList, ACTION_TYPE } from 'actions/query-module';
import QueryForm from './QueryForm';

interface Props {
  queryModule: any;
  queryApiList: (data: any) => any;
}

const mapDispatchToProps = dispatch => ({
  queryApiList: value => dispatch(queryApiList(value)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class QueryRecord extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.queryApiList({});
  }

  render() {
    let { queryModule } = this.props;
    const { apiList, loading } = queryModule;
    return (
      <div>
        <QueryForm
          queryApiList={this.props.queryApiList}
          isLoading={loading[ACTION_TYPE.QUERY_API_LIST]}
        />
        <Table
          loading={loading[ACTION_TYPE.QUERY_API_LIST]}
          columns={apiColumns}
          dataSource={apiList}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRecord);
