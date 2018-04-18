import * as React from 'react';
import { Carousel } from 'antd';

interface Props {
    enabled?: boolean;
    timeout?: number;
    immediate?: boolean;
    callback: () => any;
}

export default class ReactInterval extends React.Component<Props, {}> {
    static defaultProps = {
        enabled: false,
        timeout: 1000,
        immediate: false
    };

    timer

    componentDidMount() {
        if (this.props.immediate) {
            this.props.callback()
        }
        if (this.props.enabled) {
            this.start();
        }
    }

    shouldComponentUpdate({ timeout, callback, enabled }) {
        return (
            this.props.timeout !== timeout ||
            this.props.callback !== callback ||
            this.props.enabled !== enabled
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.enabled !== prevProps.enabled) {
            if (this.props.enabled) {
                this.start();
            } else {
                this.stop();
            }
        }
    }

    componentWillUnmount() {
        this.stop();
    }

    callback = () => {
        if (this.timer) {
            this.props.callback();
            this.start();
        }
    };

    start = () => {
        this.stop();
        this.timer = setTimeout(this.callback, this.props.timeout);
    };

    stop = () => {
        clearTimeout(this.timer);
        this.timer = null;
    };

    render() {
        return null
    };
}