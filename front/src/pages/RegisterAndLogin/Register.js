import React, { useEffect } from 'react';
import lottie from 'lottie-web'
import { TextField, Button, Typography, Link } from '@material-ui/core'

import Styles from './FormStyle'
import Animation from '../../animations/63487-programming-computer.json'


function Login() {

  const classes = Styles()

  let animationContainer = React.createRef()

  useEffect(()=>{
    lottie.loadAnimation({
      container : animationContainer.current,
      animationData : Animation
    })
  }, [])


  return(
      <div>
          <div className={classes.Main}>
            <div className={classes.Image}>
              <div ref={animationContainer}></div>
            </div>

            <div className={classes.FormDiv} >
              <form className={classes.FormInput} method='POST' action='http://localhost:3000/register'>
                <TextField name='name' variant='standard' label='Nome' className={classes.InputText}></TextField>
                <TextField name='username' variant='standard' label='Username' className={classes.InputText}></TextField>
                <TextField name='email' variant='standard' label='E-mail' className={classes.InputText}></TextField>
                <TextField type='password' name='password' variant='standard' label='Senha' className={classes.InputText}></TextField>
                <Button type={'submit'} color='Primary' variant='contained' className={classes.Button}>Enviar</Button>
              
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