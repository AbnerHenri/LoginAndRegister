import React, { useEffect, useState } from 'react';
import Styles from './userStyle'
import Lottie from 'lottie-web'
import Animation from '../../animations/89683-user-reviews.json'
import { Typography, Button } from '@material-ui/core'

import Card from '../../components/Card'

function UserLogged() {

  const classes = Styles()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  let animationContainer = React.createRef()

 useEffect(()=>{

  Lottie.loadAnimation({
    container : animationContainer.current,
    animationData : Animation
  })

  const url = window.location.pathname
  const username = url.substring(7)

  const data = {
    username : username
  }

  fetch('http://localhost:3000/userpage', {
    method : 'POST',
    headers : new Headers({'Content-type' : 'application/json'}),
    body : JSON.stringify(data)
  })
    .then( res => res.json())
    .then( data => {
      setEmail(data.email)
      setName(data.name)
      setUsername(data.username)
    })


 }, [])

 function Logout(){
   window.localStorage.clear()
   window.location.href = 'http://localhost:3001/login'
 }

  return(
      <div>
        <div style={{ display : 'flex', justifyContent : 'space-around', marginTop : 30}}>
          <div ref={animationContainer} style={{width : 600}}></div>
          <div className={classes.dataUser}>
              <Typography variant='h4' style={{ color : 'white', marginTop : 30, marginBottom : 50}}>Seus Dados</Typography>
              <Card dataUser={name} data={'Nome'}/>
              <Card dataUser={email} data={'E-mail'}/>
              <Card dataUser={username} data={'Username'}/>

              <Button 
                className={classes.logout} 
                variant='contained'
                onClick={()=> Logout()}>
                Sair
              </Button>
          </div>
        </div>
      </div>
  )
}

export default UserLogged;