import React, { useState} from 'react';
import { TextField, Button, Card } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

const input = () =>{

    const [description, setDescription] = useState("")

    const useStyles = makeStyles( theme =>(
       { card: {
            marginTop:theme.spacing(2),
            display:'flex',
            justifyContent: 'center'
        }
    }))

    const handleChange =(event)=>{
        const description = event.target.value
        setDescription(description)
    }
    
    const clickSubmit = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/",{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({description: description})
            }) 
            if(await response.json()){
                console.log("Added")     
                
                // window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const classes = useStyles()
    return(

        <Card className={classes.card}>
            <TextField name="description" onChange={handleChange} value={description} id="outlined-basic"label="Todo item" variant="outlined" ></TextField>
            <Button onClick={clickSubmit}variant="contained">Add</Button>
        </Card>
    );
       
}

export default input;