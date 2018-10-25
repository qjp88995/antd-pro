import React from 'react';
import { Icon, Upload, Button, Modal, Input, Form, Spin } from 'antd';
import FileList, { SortButton } from './FileList';
import styles from './PicturesWall.less';

const { uploadHost } = window._config;
const uploadAddr = `${uploadHost}?action=uploadimage&encode=utf-8`;
const uploadName = 'upfile';

class PicturesWall extends FileList {
  render() {
    const { value, length, sortEnabled, showRemoveIcon, showPreviewIcon, isString } = this.props;
    const { sort, previewVisible, previewEdit, editIndex, editData, loading } = this.state;
    const fileList = this.toFileList(value);
    return (
      <Spin tip="正在上传..." spinning={loading}>
        {sortEnabled && (
          <SortButton
            sort={sort}
            onClick={() => {
              this.setState({ sort: !sort });
            }}
          />
        )}
        <div className={styles.list}>
          {Array.isArray(fileList) &&
            fileList.map((item, index) => (
              <div key={`item${index}`} className={styles.card}>
                <div className={styles.img}>
                  <img src={item.url} alt="图片" />
                  {!sort && (
                    <div className={styles.mask}>
                      {showPreviewIcon && (
                        <Icon
                          type="eye"
                          theme="outlined"
                          title="查看与编辑"
                          onClick={() => this.onHandleClickEye(index)}
                        />
                      )}
                      {showRemoveIcon && (
                        <Icon
                          type="delete"
                          theme="outlined"
                          title="删除"
                          onClick={() => this.onHandleClickDelete(index)}
                        />
                      )}
                    </div>
                  )}
                </div>
                {sort &&
                  index > 0 && (
                    <div
                      className={styles.arrowLeft}
                      onClick={() => this.onSortChange(index, index - 1)}
                    >
                      <Icon type="arrow-left" theme="outlined" title="向左移" />
                    </div>
                  )}
                {sort &&
                  index < fileList.length - 1 && (
                    <div
                      className={styles.arrowRight}
                      onClick={() => this.onSortChange(index, index + 1)}
                    >
                      <Icon type="arrow-right" theme="outlined" title="向右移" />
                    </div>
                  )}
              </div>
            ))}
          {!sort && fileList.length >= length ? null : (
            <Upload
              accept="image/*"
              disabled={loading}
              action={uploadAddr}
              name={uploadName}
              showUploadList={false}
              withCredentials={true}
              listType={'picture-card'}
              onChange={this.handleChange}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            </Upload>
          )}
        </div>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img
            alt=""
            style={{ width: '100%', marginTop: 20 }}
            src={
              !previewEdit
                ? fileList[editIndex] && fileList[editIndex].url
                : editData && editData.url
            }
          />
          {!isString &&
            (!previewEdit ? (
              <div style={{ marginTop: 20 }}>
                <p>名称: {fileList[editIndex] && fileList[editIndex].title}</p>
                <p>介绍: {(fileList[editIndex] && fileList[editIndex].intro) || '暂无'}</p>
                <Button onClick={this.setEditData} type="primary" style={{ width: '100%' }}>
                  <Icon type="edit" />
                </Button>
              </div>
            ) : (
              <div style={{ paddingTop: 10 }}>
                <Form.Item label="链接">
                  <Input
                    value={editData && editData.url}
                    onChange={e => this.onEditDataChange({ url: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="名称">
                  <Input
                    value={editData && editData.title}
                    onChange={e => this.onEditDataChange({ title: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="介绍">
                  <Input.TextArea
                    value={editData && editData.intro}
                    onChange={e => this.onEditDataChange({ intro: e.target.value })}
                  />
                </Form.Item>
                <Button.Group style={{ width: '100%' }}>
                  <Button onClick={this.onEditDataSubmit} style={{ width: '50%' }} type="primary">
                    确定
                  </Button>
                  <Button
                    onClick={() => this.setState({ previewEdit: false })}
                    style={{ width: '50%' }}
                  >
                    取消
                  </Button>
                </Button.Group>
              </div>
            ))}
        </Modal>
      </Spin>
    );
  }
}

export default PicturesWall;

export const Cover = ({ value, onChange }) => (
  <div>
    <Input value={value} onChange={e => onChange(e.target.value)} />
    <PicturesWall
      value={value}
      onChange={onChange}
      length={1}
      multiple={false}
      isString={true}
      sortEnabled={false}
      showRemoveIcon={true}
      showPreviewIcon={true}
    />
  </div>
);
