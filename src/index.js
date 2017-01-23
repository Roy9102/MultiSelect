
import React, { Component } from 'react';
import ClickOutside from 'react-clickoutside-compoent';

export default class MultipleSelect extends Component {

	constructor(props) {
	  	super(props);
		
		this.showOptions  = this.showOptions.bind(this);
		this.optionMap    = {};
		
		this.childrenWithProps = this.passChildrenProps(props);

	  	this.state = {
	  		active: false
	  	};
	}

	passChildrenProps(props){
		const { children, defaultValue, onChange } = props;
		return React.Children.map(children, child => {
			const { value, children } = child.props;
			const checked             = defaultValue.indexOf(value) > -1;
			this.optionMap[value]     = {
				id:   value,
				text: children
			};
            return React.cloneElement(child, { checked, multiple: this.props.multiple, onChange });
        });

	}

	componentWillReceiveProps(nextProps){
		
		if (nextProps.defaultValue !== this.props.defaultValue){
			this.childrenWithProps = this.passChildrenProps(nextProps);	
		}
		
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( nextProps.defaultValue === this.props.defaultValue
			&& nextState.active === this.state.active ){
			return false;
		}
		return true;
	}

	getSelectDesc(){
		const { defaultValue } = this.props;
		if ("" === defaultValue || 'string' !== typeof defaultValue) return '';
		console.log(defaultValue.split(',').map( (val, index) => this.optionMap[val] && this.optionMap[val].text))
		return defaultValue.split(',').map( (val, index) => this.optionMap[val] && this.optionMap[val].text).filter(desc => desc).join(',');
	}

	showOptions(active){
		this.setState({
			active
		})
	}


	render(){
		const { active } = this.state;
		const text = this.getSelectDesc();
		return(
			<ClickOutside handleOutsideClick = {() => this.showOptions(false)} className = "multiple-select">
				<div onClick = {() => this.showOptions(!active)} className = "select-area">
					<p className = "select-value">{text}</p>
					<span className = {`select-btn ${active ? 'down' : 'up'}`}></span>
				</div>
				{
					active ? 
					<div ref = "selectDropdown" className = "select-dropdown">
						{this.childrenWithProps}
					</div> : null
				}
			</ClickOutside>

		)
	}
}
