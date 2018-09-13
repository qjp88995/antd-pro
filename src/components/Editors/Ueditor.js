import React, { Component } from 'react';

const { uploadHost } = window._config;
const UE = window.UE;

class Ueditor extends Component {
  componentDidMount() {
    this.UEditor = UE.getEditor(this.box, {
      autoClearinitialContent: true, //focus时自动清空初始化时的内容
      wordCount: false, //关闭字数统计
      elementPathEnabled: false, //关闭elementPath
      serverUrl: uploadHost,
      initialFrameWidth: '100%',
      initialFrameHeight: '600',
    });
    this.UEditor.ready(() => {
      const { value } = this.props;
      this.UEditor.setContent(value || '');
      this.UEditor.addListener('selectionchange', this.onChange);
    });
  }
  componentWillUnmount() {
    this.UEditor.removeListener('selectionchange', this.onChange);
    UE.delEditor(this.box);
    this.box.parentElement.removeChild(this.box);
  }
  onChange = () => {
    const { onChange } = this.props;
    const value = this.UEditor.getContent();
    if (onChange) onChange(value);
  };
  render() {
    return <div ref={ref => (this.box = ref)} />;
  }
}

export default Ueditor;
