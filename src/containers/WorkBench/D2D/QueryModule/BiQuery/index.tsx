import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { queryBi, ACTION_TYPE } from 'actions/query-module';
import { biColumns } from 'config/query-module';

interface Props {
  query: (data: any) => any;
  queryModule: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(queryBi(value)),
});

const mapStateToProps = ({ queryModule }) => ({ queryModule });

class BiQuery extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.query({});
  }

  render() {
    let { queryModule } = this.props;
    const { biList, loading } = queryModule;
    return (
      <div>
        <Table
          loading={loading[ACTION_TYPE.QUERY]}
          columns={biColumns}
          dataSource={biList}
          rowKey="id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiQuery);
