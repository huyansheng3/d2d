import * as React from 'react';

import { Table } from 'antd';
import { default as QueryForm } from './QueryForm';

interface Props {
    columns: any;
    data: any;
    rowKey: string;
}


export default class Shop extends React.Component<Props, any> {
    render() {
        let {
            columns,
            data,
            rowKey
        } = this.props;
        return (
            <div className="Shop">
                <h3>资产超市</h3>
                <QueryForm/>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={rowKey}
                />
            </div>
        )
    }
}

