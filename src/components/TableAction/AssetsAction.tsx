import * as React from 'react';
import { Row, Col, Modal, Button } from 'antd';

interface Props {
    rowData: any;
}

export default class AssetsAction extends React.Component<Props, any> {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    parseData = rowData => {
        let dataList = [{
            id: 'status',
            label: '状态',
        }, {
            id: 'invoiceNumber',
            label: '发票号码',
        }, {
            id: 'invoiceCode',
            label: '发票代码',
        }, {
            id: 'payment',
            label: '账期(天)',
        }, {
            id: 'amount',
            label: '发票金额(万元)',
        }, {
            id: 'billingDate',
            label: '开票日期',
        }, {
            id: 'coreCompany',
            label: '核心企业',
        }, {
            id: 'upCompany',
            label: '上游企业',
        }, {
            id: 'hashTrade',
            label: '发票',
            span: 24
        }, {
            id: 'hashElectronic',
            label: '合同',
            span: 24
        }]
        return (
            <Row>
                {dataList.map(({id, label, span = 12}: any) => this.parseItem(id, label, rowData[id], span))}
            </Row>
        )
    }

    parseItem = (id, label, value, span) => {
        return (
            <Col span={span} key={id}>
                {label}: {value}
            </Col>
        )
    }

    render() {
        let { rowData } = this.props;
        return (
            <div>
                <Button type="dashed" onClick={this.showModal}>查看明细</Button>
                <Modal
                    title="查看资产包"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="70%"
                >
                    {this.parseData(rowData)}
                </Modal>
            </div>
        )
    }
}
