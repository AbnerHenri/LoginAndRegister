import React, { useEffect, useState } from 'react';
import lottie from 'lottie-web'
import { TextField, Button, Typography, Link } from '@material-ui/core'

import Styles from './FormStyle'
import Animation from '../../animations/63487-programming-computer.json'


function Login() {

  const classes = Styles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  let animationContainer = React.createRef()

  useEffect(()=>{
    lottie.loadAnimation({
      container : animationContainer.current,
      animationData : Animation
    })

  }, [])

  const data = {
    email : email,
    password : password
  }

  const options = { 
    method : 'POST',
    headers : new Headers({'Content-type' : 'application/json'}),
    body : JSON.stringify(data)
  }

  function MyPost(e){
    e.preventDefault()

    fetch('http://localhost:3000/', options)
      .then( res => res.json())
      .then( data => {

        if(data.token){
          localStorage.setItem('token', data.token)
          window.location.href = `http://localhost:3001/users/${data.username}`
        }else{
          setMessage(data.msg)
        }
      })
  }
  

  return(
      <div>
          <div className={classes.Main}>
            <div className={classes.Image}>
              <div ref={animationContainer}></div>
          </div>

            <div className={classes.FormDiv}>

              <Typography color='error' className={classes.ErrorMessage}>{message}</Typography>

              <form className={classes.FormInput}>

                <TextField 
                    name='email' 
                    variant='standard' 
                    label='E-mail' 
                    className={classes.InputText}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                </TextField>

                <TextField 
                    type='password' 
                    name='password' 
                    variant='standard' 
                    label='Senha' 
                    className={classes.InputText}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                </TextField>

                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    className={classes.Button}
                    onClick={(e) => MyPost(e)}>
                    Enviar
                </Button>

                <Typography className={classes.Link}>
                    Ainda não possuí cadastro?
                    <Link href='/register' style={{cursor : 'pointer'}}> Clique Aqui</Link>
                  </Typography>
              </form>
            </div>
          </div>
      </div>
  )
}

export default Login;