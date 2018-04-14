import React, { Component } from 'react';
import { range } from 'lodash';
import './index.css';

interface Props {
  count?: number;
}

class BgBubble extends Component<Props, any> {
  static defaultProps = {
    count: 10,
  };

  render() {
    const { count } = this.props;
    const items = range(1, count);
    return (
      <ul className="bg-bubbles">
        {items.map(item => {
          return <li key={item} />;
        })}
        {this.props.children}
      </ul>
    );
  }
}

export default BgBubble;
