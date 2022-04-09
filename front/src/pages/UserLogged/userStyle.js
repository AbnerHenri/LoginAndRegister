import { makeStyles } from "@material-ui/core";

const Styles = makeStyles({
    dataUser : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        width : 450,
        height : '90vh',
        backgroundColor : '#4169E1',
        boxShadow : '2px 4px 12px 0px black'
    },

    logout : {
        width : 400,
        height : 50,
        marginTop : 60
    }
})

export default Styles;