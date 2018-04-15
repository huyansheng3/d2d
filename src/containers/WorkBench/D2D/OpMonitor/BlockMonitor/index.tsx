import * as React from 'react';
import { connect } from 'react-redux';
import QueryForm from './QueryForm';

interface Props {}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = () => ({});

class QueryRecord extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <QueryForm />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRecord);
