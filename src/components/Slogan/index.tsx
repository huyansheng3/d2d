import * as React from 'react';
import './style.css';

interface Props {
    configs: ReadonlyArray<any>
}

export default class Slogan extends React.Component<Props, any> {
    parseConfig({ image, title }) {
        console.log(image)
        return (
            <div key={title} className="box">
                <div style={{ background: `url('${image}')` }} className="image" />
                <div className="title">{title}</div>
            </div>
        )
    }
    render() {
        let { configs } = this.props;
        return (
            <div className="Slogan">
                {configs.map(config => this.parseConfig(config))}
            </div>
        )
    }
}
