import React, { useState, useEffect } from 'react'
import Title from './Title'
import axios from 'axios'

function Results() {

    const [results, setResults] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/test-api/'
        }).then(response => {
            setResults(response.data)
        })
    }, [])

    return (
        <div className='container'>

            <Title name='Результаты' />

            {/* <ul className='list-unstyled mt-3'>
                {results.map(r => (
                    <li key={r.id}>{r.iterations.map(el => )}</li>
                ))}
            </ul> */}
            <pre className='mt-3'>
                {JSON.stringify(results, null, 2)}
            </pre>
        </div>
        
    )
}

export default Results