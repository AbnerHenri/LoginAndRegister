import { makeStyles } from '@material-ui/core'

const Styles = makeStyles({

    '@global' : {
        body : {
            backgroundColor : 'black'
        }
    },

    Main : {
        display : 'flex',
        margin : 'auto',
        marginTop : '30px',
        width : '80vw',
        height : '90vh',
        boxShadow: '0 10px 20px rgba(0, 0, 0, .5)'
    },

    Image : {
        display : 'flex',
        justifyContent : 'center',
        width : '65%',
        height : '100%',
        borderRight : '1px solid black',
        backgroundColor : '#191919',
    },

    FormDiv : {
        width : '35%',
        height : '100%',
        backgroundColor : '#ffffff',
    },

    FormInput : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%',
        height : '100%'
    },
    
    InputText : {
        marginBottom : 25 
    },

    Button : {
        position : 'relative',
        top : 30,
        width : 200,
    },

    Link : {
        position : 'relative',
        top : 85,
    }
})

export default Styles;