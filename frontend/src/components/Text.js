import React from 'react'

const Text = (props) => {
    return (
        <span style={props.style}>
            {props.children}
        </span>
    )
}

export default Text