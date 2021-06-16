import React from 'react'
import { TextField, Fab } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove';
import { Field } from 'formik';

function InputField ({number, deleteInputField}) {

    return (
        <div className='row my-4'>
            <div className='col-8 col-md-10 d-flex justify-content-center'>
                <Field
                    name={`equasion${number}`}  
                    type='input'
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    label={`Уравнение ${number}`}
                />
            </div>
            <div className='col-4 col-md-2 d-flex justify-content-end'>
                <Fab
                    color="secondary" 
                    aria-label="remove"
                    onClick={() => deleteInputField(number-1)}
                >
                    <RemoveIcon />
                </Fab>
            </div>
        </div>
    )
}

export default InputField