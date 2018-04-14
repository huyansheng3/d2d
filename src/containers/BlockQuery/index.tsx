import * as React from 'react';
import { connect } from 'react-redux';
import { Banner, Shop, Slogan, HomeLayout } from 'components';
import { MARKET as MARKET_ACTION } from 'actions';
import { BANNER_IMAGES, SLOGAN_CONFIGS, AssetsShop } from 'config';
const { query } = MARKET_ACTION;
const { columns } = AssetsShop;

interface Props {
  query: (value: any) => any;
  market: any;
}

const mapDispatchToProps = dispatch => ({
  query: value => dispatch(query(value)),
});

const mapStateToProps = ({ market }) => ({ market });

class Home extends React.Component<Props, any> {
  componentDidMount() {
    this.props.query({});
  }
  render() {
    let { market } = this.props;
    let { records = [] } = market;
    return (
      <HomeLayout>
        <div style={{ background: '#fff', paddingTop: 24, minHeight: 1200 }}>
          <Banner images={BANNER_IMAGES} />
          <Shop columns={columns} data={records} rowKey="capitalNo" />
          <Slogan configs={SLOGAN_CONFIGS} />
        </div>
      </HomeLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
