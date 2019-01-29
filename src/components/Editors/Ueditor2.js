import React, { Component } from 'react';
import { Card } from 'antd';

const { uploadHost } = window.appConfig;
const { UE, UEDITOR_CONFIG } = window;

export default class Ueditor extends Component {
    constructor(props){
        super(props);
        if (UE) {
            this.editor = new UE.Editor({
                ...UEDITOR_CONFIG,
                autoClearinitialContent: true, // focus时自动清空初始化时的内容
                wordCount: false, // 关闭字数统计
                elementPathEnabled: false, // 关闭elementPath
                serverUrl: uploadHost,
                initialFrameWidth: '100%',
                initialFrameHeight: '600',
            });
        }
    }

    componentDidMount() {
        if (this.editor){
            this.editor.ready(() => {
                const { value } = this.props;
                this.editor.setContent(value || '');
                this.editor.addListener('contentChange', this.onChange);
            });
            this.editor.render(this.ref);
        }
    }

    componentWillUnmount() {
        if (this.editor){
            this.editor.removeListener('contentChange', this.onChange);
            // this.ref.parentElement.removeChild(this.ref);
            this.editor.destroy();
        }
    }

    onChange = () => {
        const { onChange } = this.props;
        const value = this.editor.getContent();
        if (onChange) onChange(value);
    };

    render() {
        return (<Card> <div ref={ref => {this.ref = ref}} /> </Card>);
    }
}