import React, { useState, useEffect } from 'react'
import Title from './Title'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { Container, TextField, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import NavigationIcon from '@material-ui/icons/Navigation'
import InputFieldList from './InputFieldList'
import { Link } from 'react-router-dom'

function Solvers () {

    const [inputs, setInputs] = useState ([
        {id: 1, number: 2},
    ])

    const [resData, setResData] = useState ([])

    function addInputField() {
        setInputs([
            ...inputs,
            {
                id: inputs.length + 1,
                number: inputs.length + 2
            },
        ])

    }

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: 'http://127.0.0.1:8000/api/test-api/'
    //     }).then(response => {
    //         setResults(response.data)
    //     })
    // }, [])


    // function resetNumbers() {
    //     setInputs(inputs.map(item => {
    //         item.id = inputs.indexOf(item) + 1
    //         item.number = inputs.indexOf(item) + 2
    //     }))
    // }


    function deleteInputField (id) {
        setInputs(inputs.filter(item => item.id !== id))
    }

    return (
        <Container>
            <Title name='Решение нелинейных уравений' title='методом Ньютона' />
            <p className='boring-text'>
                Метод последовательных приближений (Ньютона) 
                используется для решения систем нелинейных уравнением с <b className='bold-red'>n</b> количеством 
                неизвестных и <b className='bold-red'>n</b> количеством уравнений.  
                Для решения уравнения необходимо ввести <b className='bold-red'>n</b> неизвестных    
                и <b className='bold-red'>n</b> уравнений, а затем задать начальное приближение.
            </p>
            <p className='boring-text'>
                <b className='bold-red'>Дробные числа вводятся через точку</b><br/>
                <b className='bold-red'>Перед вводом уравнения должны быть приравнены к нулю</b>
            </p>
            <Formik 
                initialValues={{ variables:'', initial_guess:'' }}
                onSubmit={ 
                    async function handleSubmit (values) {
                    await axios.post('https://non-linear.herokuapp.com/api/test-api/', {
                        values,
                    }).then(res => setResData(res.data))
                }}
                // axios({
                //     method: 'GET',
                //     url: 'http://127.0.0.1:8000/api/test-api/'
                // }).then(response => {
                //     setResults(response.data)
                // })
            >
                {({ values }) => (
                    <Form className='input-equasion d-flex justify-content-center flex-column'>
                        <h3>1. Задайте искомые переменные:</h3>
                        <h1 className='d-flex justify-content-center '>
                            F(
                            <Field 
                                placeholder='Например: Q1,Q2,Q_max,T1,T_min'
                                name='variables'  
                                type='input'
                                fullWidth
                                as={TextField}
                                variant="outlined"
                                required
                        />)
                        </h1>
                        <h3 className='my-2'>2. Введите приравненные к нулю уравнения системы:</h3>
                        <div className='row my-4'>
                            <div className='col-8 col-md-10 d-flex justify-content-start'>
                                <Field name='equasion1'  
                                    type='input'
                                    as={TextField}
                                    fullWidth
                                    label="Уравнение 1"
                                    variant="outlined"
                                    required
                                />
                                
                            </div>
                            <div className='col-4 col-md-2 d-flex justify-content-end'>
                                <Fab
                                    color="primary" 
                                    aria-label="add"
                                    onClick={() => addInputField()}
                                >
                                    <AddIcon />
                                </Fab>
                            </div>
                        </div>
                        <InputFieldList 
                            inputs={inputs}
                            deleteInputField={deleteInputField}
                        />
                        <h3>3. Задайте первое приближение (предположительные значения переменных):</h3>
                        <h1 className='d-flex justify-content-center'>
                            F(
                            <Field 
                                placeholder='Например: 2000,30.231,3325.11,293,70'
                                name='initial_guess'  
                                type='input'
                                fullWidth
                                as={TextField}
                                variant="outlined"
                                required
                        />)
                        </h1>
                        <h3>4. Задайте итерируемую переменную:</h3>
                        <h1 className='d-flex justify-content-center'>
                            <Field 
                                placeholder='Например: T1'
                                name='iterate_what'  
                                type='input'
                                as={TextField}
                                variant="outlined"
                        />
                        </h1>
                        <h3>5. Задайте количество итераций (Например: от 1 до 20 с шагом 1):</h3>
                        <h1 className='d-flex justify-content-start'>
                            <Field 
                                placeholder='От:'
                                name='iterate_from'  
                                type='number'
                                as={TextField}
                                variant="outlined"
                                className='col-lg-3 col-md-3 col-sm-5 mx-2'
                            />
                            <Field 
                                placeholder='До: '
                                name='iterate_to'  
                                type='number'
                                as={TextField}
                                variant="outlined"
                                className='col-lg-3 col-md-3 col-sm-5 mx-2'
                            />
                            <Field 
                                placeholder='С шагом: '
                                name='iterate_step'  
                                type='number'
                                as={TextField}
                                variant="outlined"
                                className='col-lg-3 col-md-3 col-sm-5 mx-2'
                            />
                        </h1>
                        {/* <Link to='/results'> */}
                            <Fab 
                                variant="extended" color='primary' type="submit" className='my-3 w-100'
                            >
                                Решить
                                <NavigationIcon />
                            </Fab>
                        {/* </Link> */}
                    </Form>
                

                    
                )}
            </Formik>

            {resData.length === 0 ? <Title name='Результатов еще нет' />
            :
            <div>
                <Title name='Результаты расчета' />
                <div className='d-flex justify-content-center align-items-center mb-5'>
                <table cellpadding="5" border="1" >
                    {resData.map(item => {
                        return (
                            <tr>
                                <td>{item.id === 0 ? item.iterable : item.id}</td>
                                {item.iteration.map(i => <td>{i}</td> )}
                            </tr>
                        )
                    })}
                </table>
                </div>
            </div>
                    
            }
            {/* // <Title name='Результаты' />

            // <pre className='mt-3'>
            //     {JSON.stringify(results, null, 2)}
            // </pre> */}

        </Container>

    )

}

export default Solvers