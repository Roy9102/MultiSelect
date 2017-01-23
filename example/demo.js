

'use strict';

import '../assets/index.less';
import React from "react";
import ReactDOM from 'react-dom';
import MultipleSelect from '../';
import Option from '../src/Option';


class Demo extends React.Component {

	constructor(props) {
	  	super(props);
	
		this.handleChange = this.handleChange.bind(this);
	  	this.state = {
	  		value : "B"
	  	};
	}


	handleChange( value ){
		const valueList = this.state.value.split(',');
		console.log(valueList)
		const pos       = valueList.indexOf(value);
		if ( pos > -1){
			this.setState({
				value :[
						...valueList.slice(0, pos),
						...valueList.slice(pos + 1)
					].join(',')
			})
		}else{
			this.setState({
				value: [
					...valueList,
					value
				].join(',')
			})	
		}
		
	}

	render(){
		const value = this.state.value;
		return (
			<MultipleSelect onChange = { this.handleChange } multiple = {true} defaultValue = {value}>
				<Option value = "A" >optionA</Option>
				<Option value = "B" >optionB</Option>
				<Option value = "C" >optionC</Option>
				<Option value = "D" >optionD</Option>
			</MultipleSelect>
		)
	}
}

ReactDOM.render(<Demo />, document.querySelector('#MultipleSelect'));
