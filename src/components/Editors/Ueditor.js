import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

// eslint-disable-next-line no-underscore-dangle
const { uploadHost } = window._config;
const { UE } = window;

export default class Ueditor extends Component {
    constructor(props){
        super(props);
        this.id = uuidv1();
    }

    componentDidMount() {
        this.UEditor = UE.getEditor(this.id, {
            autoClearinitialContent: true, // focus时自动清空初始化时的内容
            wordCount: false, // 关闭字数统计
            elementPathEnabled: false, // 关闭elementPath
            serverUrl: uploadHost,
            initialFrameWidth: '100%',
            initialFrameHeight: '600',
        });
        this.UEditor.ready(() => {
            const { value } = this.props;
            this.UEditor.setContent(value || '');
            this.UEditor.addListener('contentChange', this.onChange);
        });
    }

    componentWillUnmount() {
        this.UEditor.removeListener('contentChange', this.onChange);
        UE.delEditor(this.id);
        const elem = document.getElementById(this.id);
        elem.parentElement.removeChild(elem);
    }

    onChange = () => {
        const { onChange } = this.props;
        const value = this.UEditor.getContent();
        if (onChange) onChange(value);
    };

    render() {
        return (<div> <div id={this.id} /> </div>);
    }
}