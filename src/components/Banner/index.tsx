import * as React from 'react';
import { Carousel } from 'antd';

const $css = {
    banner: image => ({
        width: '100vw',
        height: '200px',
        background: `url('${image}')`
    })
}

interface Props {
    images: ReadonlyArray<any>;
    parseConfig?: any;
}
export default class Banner extends React.Component<Props, any> {
    parseConfig = image => <div key={image} style={$css.banner(image)} />

    render() {
        let {
            images,
            parseConfig = this.parseConfig
        } = this.props;
        return (
            <Carousel autoplay>
               {images.map( image => parseConfig(image))}
            </Carousel>
        )
    }
}

