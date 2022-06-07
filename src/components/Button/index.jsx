import React from 'react'

const Button = ({ title, action, height, width, sizeText, colorButton=undefined, isDisable= false}) => {

    return (
        <button
            onClick={action}
            style={{
                height: height, 
                width: width, 
                fontSize:sizeText, 
                borderRadius:5, 
                background: colorButton,
                fontWeight:"bold" 
            }}
            disabled={isDisable}
        > {title}</button>
    )
}

export default Button