import React from 'react'

const View = (props) => {
    return (
        <div className='view' style={props.style}>
            {props.children}
        </div>
    )
}

export default View