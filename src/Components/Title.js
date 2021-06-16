import React from 'react'

function Title({name, title}) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-3 text-left text-title">
                <h3 className='text-center'>
                    {name} <strong className='bold-red'>{title} </strong>
                </h3>
            </div>
        </div>
    )
}

export default Title