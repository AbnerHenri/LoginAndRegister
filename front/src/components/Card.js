import React, { useState } from 'react';
import { Typography, Modal, Box, TextField, Button } from '@material-ui/core';
import Edit from '../assests/edit.png'

function Card(props) {

const [open, setOpen] = useState(false)
const [edit, setEdit] = useState('')
const [message, setMessage] = useState('')
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

const CardStyle = {
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
    width : '85%',
    border : '1px solid white',
    padding : 10,
    marginTop : 25,
    backgroundColor : 'white',
    borderRadius : '0px 15px 0px 15px'
}

const BoxStyle = {
    margin : 'auto',
    marginTop : 150,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'column',
    width : '50%',
    height : 300,
    backgroundColor : 'white',
}

const FormStyle = {
    display : 'flex',
    flexDirection : 'column',   
}

const ButtonForm = {
    padding : 10,
    marginTop : 25
}

async function EditElement(e){
    e.preventDefault()

    const url = window.location.pathname
    const newUrl = url.substring(7)

    const data = {}

    switch (props.data) {
        case 'Nome':
            data.name = edit
            data.email = undefined
            data.username = undefined
            data.url = newUrl
        break;

        case 'E-mail' : 
                data.name = undefined
                data.email = edit
                data.username = undefined
                data.url = newUrl
            break;

        case 'Username' : 
                data.name = undefined
                data.email = undefined
                data.username = edit
                data.url = newUrl

        default:
            break;
    }

    console.log(data)

    const options = { 
        method : 'PUT',
        headers : new Headers({'Content-type' : 'application/json'}),
        body : JSON.stringify(data)
      }

    fetch('http://localhost:3000/edit', options)
        .then( res => res.json())
        .then( data => { console.log(data)
            if(data.url){
                window.location.href = `http://localhost:3001/users/${data.url}`
            }else{
                window.location.reload()
            }
            
            if(data.msgError){
                setMessage(props.data + ' ' + data.msgError)
            }
        })
        .catch( error => console.log(error))
}

  return(
      <div style={CardStyle}>
          <Typography variant='h6'><strong>{props.data} : </strong>{props.dataUser}</Typography>
          <img src={Edit} alt='edit' onClick={handleOpen} style={{width : 50}}></img>
          <Modal open={open} onClose={handleClose}>
                <Box style={BoxStyle}>
                    <Typography variant='h5'style={{marginBottom : 30}}>Edite seu {props.data}</Typography>
                    <div style={FormStyle}>

                        <Typography color='error'>{message}</Typography>

                        <TextField 
                            variant='filled' 
                            style={{width : 300, height : 50}}
                            onChange={(e)=> setEdit(e.target.value)}>
                        </TextField>

                        <Button
                            color='primary' 
                            variant='contained' 
                            style={ButtonForm}
                            onClick={(e)=> EditElement(e)}>
                            Editar
                        </Button>

                    </div>
                </Box>
          </Modal>
      </div>
  )
}

export default Card;