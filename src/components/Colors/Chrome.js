import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { handleChange, convertColor } from './Common';

export default class ChromeColor extends Component{
    constructor(props){
        super(props)
        this.handleChange = handleChange.bind(this);
        this.convertColor = convertColor.bind(this);
    }

    render(){
        const { value } = this.props;
        return (
            <div> <ChromePicker color={this.convertColor(value)} onChange={this.handleChange} /> </div>
        )
    }
}