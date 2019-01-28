import React, { PureComponent } from 'react';
import { Input } from 'antd';
import PicturesWall from './PicturesWall';

export default class Cover extends PureComponent {
    render() {
        const { value, onChange } = this.props;
        return (
            <div>
                <Input value={value} onChange={e => onChange(e.target.value)} />
                <PicturesWall
                    value={value}
                    onChange={onChange}
                    length={1}
                    multiple={false}
                    isString
                    sortEnabled={false}
                    showRemoveIcon
                    showPreviewIcon
                />
            </div>
        );
    }
}
