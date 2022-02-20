import React from 'react'

const TextInput = (props) => {
    return (
        <input
            style={props.style}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
}

export default TextInput