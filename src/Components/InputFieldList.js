import React from 'react'
import InputField from './InputField'

function InputFieldList ({inputs, deleteInputField}) {
    return (
        <React.Fragment>
            {inputs.map(item => <InputField key={item.id} number={item.number} deleteInputField={deleteInputField} /> )}
        </React.Fragment>
    )
}

export default InputFieldList