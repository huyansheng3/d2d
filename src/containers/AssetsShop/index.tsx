import * as React from 'react';
import { connect } from 'react-redux';
import { Shop } from 'components';
import { MARKET as MARKET_ACTION } from 'actions';
import { AssetsShop as CONFIG } from 'config';

const { query } = MARKET_ACTION;
const { columns } = CONFIG;

interface Props {
    query: (value: any) => any;
    market: any;
}

const mapDispatchToProps = dispatch => ({
    query: value => dispatch(query(value))
})

const mapStateToProps = ({ market }) => ({ market })

class AssetsShop extends React.Component<Props, any> {
    componentDidMount() {
        this.props.query({});
    }
    render() {
        let { market } = this.props;
        let { records = [] } = market;
        return (
            <Shop columns={columns} data={records} rowKey="capitalNo" />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetsShop);
