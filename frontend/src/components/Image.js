import React from 'react'

const Image = (props) => {
    return (
        <img src={props.source} alt={props.alt} style={props.style} />
    )
}

export default Image