import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

// eslint-disable-next-line no-underscore-dangle
const { uploadHost } = window.appConfig;
const { UE } = window;

export default class Ueditor extends Component {
    constructor(props){
        super(props);
        this.id = uuidv1();
    }

    componentDidMount() {
        if (UE){
            this.editor = UE.getEditor(this.id, {
                autoClearinitialContent: true, // focus时自动清空初始化时的内容
                wordCount: false, // 关闭字数统计
                elementPathEnabled: false, // 关闭elementPath
                serverUrl: uploadHost,
                initialFrameWidth: '100%',
                initialFrameHeight: '600',
            });
            this.editor.ready(() => {
                const { value } = this.props;
                this.editor.setContent(value || '');
                this.editor.addListener('contentChange', this.onChange);
            });
        }
    }

    componentWillUnmount() {
        if (this.editor){
            this.editor.removeListener('contentChange', this.onChange);
            UE.delEditor(this.id);
            const elem = document.getElementById(this.id);
            elem.parentElement.removeChild(elem);
        }
    }

    onChange = () => {
        const { onChange } = this.props;
        const value = this.editor.getContent();
        if (onChange) onChange(value);
    };

    render() {
        return (<div> <div id={this.id} /> </div>);
    }
}