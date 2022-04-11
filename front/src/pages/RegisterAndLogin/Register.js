import React, { useEffect, useState } from 'react';
import lottie from 'lottie-web'
import { TextField, Button, Typography, Link } from '@material-ui/core'

import Styles from './FormStyle'
import Animation from '../../animations/63487-programming-computer.json'


function Login() {

  const classes = Styles()
  const [msg, setMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let animationContainer = React.createRef()

  useEffect(()=>{
    lottie.loadAnimation({
      container : animationContainer.current,
      animationData : Animation
    })

  }, [])

  function MyPost(e){
    e.preventDefault()

    const data = {
      name : name,
      username : username,
      email : email,
      password : password
    }

    const options = {
      method : 'POST',
      headers : new Headers({'Content-type' : 'application/json'}),
      body : JSON.stringify(data)
    }

    fetch('http://localhost:3000/register', options)
      .then( res => res.json())
      .then( data => {
        console.log(data)
        if(data.msgError){
          setMsg(data.msgError)
        }
        
        if(data.msgSucess){
          localStorage.clear()
          window.location.href = 'http://localhost:3001/login'
        }
      })
  }

  return(
      <div>
          <div className={classes.Main}>
            <div className={classes.Image}>
              <div ref={animationContainer}></div>
            </div>

            <div className={classes.FormDiv} >

              <Typography color='error' className={classes.ErrorMessage}>{msg}</Typography>

              <form className={classes.FormInput}>

                <TextField 
                    name='name' 
                    variant='standard' 
                    label='Nome' 
                    className={classes.InputText}
                    onChange={(e)=> setName(e.target.value)}>
                </TextField>

                <TextField 
                    name='username' 
                    variant='standard' 
                    label='Username' 
                    className={classes.InputText}
                    onChange={(e)=> setUsername(e.target.value)}>
                </TextField>

                <TextField 
                    name='email' 
                    variant='standard' 
                    label='E-mail' 
                    className={classes.InputText}
                    onChange={(e)=> setEmail(e.target.value)}>
                </TextField>

                <TextField 
                    type='password' 
                    name='password' 
                    variant='standard' 
                    label='Senha' 
                    className={classes.InputText}
                    onChange={(e)=> setPassword(e.target.value)}>
                </TextField>

                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    className={classes.Button}
                    onClick={(e)=> MyPost(e)}>
                    Enviar
                </Button>
              
                <Typography className={classes.Link}>
                    Já possuí cadastro? 
                    <Link href='/login' style={{cursor : 'pointer'}}> Clique Aqui</Link>
                </Typography>
              </form>
            </div>
          </div>
      </div>
  )
}

export default Login;