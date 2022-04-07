import React, { useEffect, useState } from 'react';
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

            <div className={classes.FormDiv}>

              <form className={classes.FormInput} method='POST' action='http://localhost:3000/'>

                <TextField 
                    name='email' 
                    variant='standard' 
                    label='E-mail' 
                    className={classes.InputText}>
                </TextField>

                <TextField 
                    type='password' 
                    name='password' 
                    variant='standard' 
                    label='Senha' 
                    className={classes.InputText}>
                </TextField>

                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    className={classes.Button}
                    onClick={()=> deleteAllCookies()}>
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