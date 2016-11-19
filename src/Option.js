import React from 'react';


const Option = props => (
	<div data-id = {props.value} className = "multi-option">
		<label htmlFor = {`option-${props.value}`}>
			{props.multiple ? 
				<input 
					onChange = {() => props.onChange(props.value)} 
					checked = {props.checked} 
					id = {`option-${props.value}`} 
					type = "checkbox" /> 
				: null
			}
			<span>{props.children}</span>
		</label>
	</div>
)

export default Option;