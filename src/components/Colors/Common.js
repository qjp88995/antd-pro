export const rgbaReg = /^rgba\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?),(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?),(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?),(1|0|0\.\d+?)\)$/;
export const rgbReg = /^rgb\((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?),(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?),(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]?)\)$/;
export const hexReg = /^#([0-9a-zA-Z]{3}|[0-9a-zA-Z]{6})$/;
export const spaceReg = /\s/g;

export function handleChange(color) {
    const { value, onChange } = this.props;
    const newValue = value && value.toString().replace(spaceReg, '');
    if (rgbaReg.test(newValue)){
        const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        if (onChange) onChange(rgba);
    }
    if (rgbReg.test(newValue)){
        const rgb = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`;
        if (onChange) onChange(rgb);
    }
    if (hexReg.test(newValue)){
        if (onChange) onChange(color.hex);
    }
    return false;
}

export function convertColor(value) {
    const color = value && value.toString().replace(spaceReg, '');
    if (rgbaReg.test(color)){
        const rgba = rgbaReg.exec(color);
        return { r: Number(rgba[1]), g: Number(rgba[2]), b: Number(rgba[3]), a: Number(rgba[4]) };
    }
    if (rgbReg.test(color)){
        const rgb = rgbReg.exec(color);
        return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
    }
    if (hexReg.test(color)){
        return color;
    }
    return '#fff';
}