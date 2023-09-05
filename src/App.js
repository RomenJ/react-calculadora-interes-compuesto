//import logo from './logo.svg';
//import './App.css';
import styled from 'styled-components'
import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'
import HeaderApp from './components/HeaderApp'
import Background from './components/Background'

const compoundInterest=(deposit, contribution,years,rate)=>{
  let total=deposit
  for (let i=0;i<years;i++){

    total= (total+contribution)* (rate+1)
  }
return Math.round(total)
}

const formatter=new Intl.NumberFormat ('en-US',{
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits:2, 
  maximumFractionDigits:2,
})
function App() {
  const [balance, setBalance]= useState('')
  const handleSubmit=({deposit,contribution,years,rate})=>{
    const val= compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate))
      console.log(val)
      setBalance(formatter.format(val))
  }
  return (
    <Background>
    <Container>
      <Section>
        <HeaderApp>Calculadora de interés compuesto</HeaderApp>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}

          onSubmit={handleSubmit}
          validationSchema={ Yup.object({
            deposit: Yup.number().required('Campo requerido').typeError('Debe ser un número'),
            contribution: Yup.number().required('Campo requerido').typeError('Debe ser un número'),
            years: Yup.number().required('Campo requerido').typeError('Debe ser un número'),
            rate: Yup.number().required('Campo requerido').typeError('Debe ser un número').min(0,'El valor mínimo es 0 ').max(1, 'El valor máximo es 2'),

          })}
        >
          <Form>
            <Input name="deposit" label="Depósito Inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type="submit"> Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance> Bance final: {balance}</Balance> : null}
     </Section>
    </Container>    
  </Background>
  );
}

export default App;
