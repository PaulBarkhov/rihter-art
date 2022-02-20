import React from 'react'

const TouchableOpacity = (props) => {
    return (
        <div
            className='touchableOpacity'
            style={props.style}
            onClick={props.onClick}
            onMouseDown={e => e.target.style.opacity = 0.4}
            onMouseUp={e => e.target.style.opacity = 1}
        >
            {props.children}
        </div>
    )
}

export default TouchableOpacity