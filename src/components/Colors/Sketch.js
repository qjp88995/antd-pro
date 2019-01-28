import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { handleChange, convertColor } from './Common';

export default class SketchColor extends Component{
    constructor(props){
        super(props)
        this.handleChange = handleChange.bind(this);
        this.convertColor = convertColor.bind(this);
    }

    render(){
        const { value } = this.props;
        return (
            <div> <SketchPicker color={this.convertColor(value)} onChange={this.handleChange} /> </div>
        )
    }
}