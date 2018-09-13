import React, { Component } from 'react';
import { Button, message } from 'antd';

export const SortButton = ({ sort, onClick }) => (
  <div>
    <Button type={!sort ? '' : 'primary'} onClick={onClick}>
      {!sort ? '点击排序' : '排序完成'}
    </Button>
  </div>
);

class FileList extends Component {
  state = {
    sort: false,
    loading: false,
    editIndex: null,
    editData: null,
    previewVisible: false,
    previewEdit: false,
  };
  toImgSrc = url => {
    const { staticHost } = window._config;
    return /(^http:\/\/)|(^https:\/\/)/.test(url) ? url : `${staticHost}${url}`;
  };

  toValue = ({ fileList, multiple, isString }) => {
    if (multiple) {
      return isString ? fileList.map(item => item.url) : fileList;
    } else {
      return isString ? fileList[0] && fileList[0].url : fileList[0];
    }
  };

  toFileList = value => {
    if (value) {
      if (Array.isArray(value)) {
        return value.map(item => (typeof item === 'string' ? { url: item } : item));
      } else {
        return typeof value === 'string' ? [{ url: value }] : [value];
      }
    } else {
      return [];
    }
  };

  handleChange = ({ file }) => {
    this.setState({ loading: true });
    if (file.response) {
      this.setState({ loading: false });
      if (file.response.url && file.response.state === 'SUCCESS') {
        const { value } = this.props;
        const fileList = this.toFileList(value);
        this.onChange([
          ...fileList,
          { title: file.response.title, url: `${file.response.host}${file.response.url}` },
        ]);
      } else {
        message.error(file.response.state || '上传文件出错');
      }
    }
  };
  onHandleClickEye = index => {
    this.setState({
      editIndex: index,
      previewVisible: true,
      previewEdit: false,
    });
  };
  onHandleClickDelete = delIndex => {
    const { value } = this.props;
    const fileList = this.toFileList(value).filter((item, index) => index !== delIndex);
    this.onChange(fileList);
  };
  setEditData = () => {
    const { value } = this.props;
    const { editIndex } = this.state;
    this.setState({
      editData: this.toFileList(value)[editIndex],
      previewEdit: true,
    });
  };
  onEditDataChange = value => {
    const { editData } = this.state;
    this.setState({
      editData: {
        ...editData,
        ...value,
      },
    });
  };
  onEditDataSubmit = () => {
    const { editIndex, editData } = this.state;
    const { value } = this.props;
    const fileList = this.toFileList(value);
    fileList[editIndex] = editData;
    this.onChange(fileList);
    this.setState({ previewEdit: false });
  };
  onSortChange = (currIndex, nextIndex) => {
    const { value } = this.props;
    const fileList = this.toFileList(value);
    const newArr = [...fileList];
    newArr[currIndex] = fileList[nextIndex];
    newArr[nextIndex] = fileList[currIndex];
    this.onChange(newArr);
  };
  onChange = fileList => {
    const { onChange, multiple, isString } = this.props;
    if (onChange) onChange(this.toValue({ fileList, multiple, isString }));
  };
}

export default FileList;
