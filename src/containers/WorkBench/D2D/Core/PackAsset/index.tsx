import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { query } from 'actions/assets';
import { columns } from 'config/assets';
import QueryForm from './QueryForm';

interface Props {
    query: (data: any) => any;
    assets: any;
}

const mapDispatchToProps = dispatch => ({
    query: value => dispatch(query(value))
})

const mapStateToProps = ({ assets }) => ({ assets })

class PackAsset extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.query({});
    }

    render() {
        let { assets } = this.props;
        return (
            <div>
                <QueryForm />
                <Table
                    columns={columns}
                    dataSource={assets.map( ({ state: { data: { asset }}}) => asset )}
                    rowKey="id"
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackAsset);
