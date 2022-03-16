import React, { useState, useEffect} from 'react';
import { Dialog, DialogTitle,TextField, DialogActions,Button,DialogContent,DialogContentText, Box,Card ,Typography,List, ListItemText, ListItem, IconButton } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import Edit from './editTodo'
const list = () =>{

    const [ todoItem, setTodos] = useState([])
    

    
    const useStyles = makeStyles( theme =>(
       { card: {
            marginTop:theme.spacing(2),
            display:'flex',
            justifyContent: 'center'
        },
        icon:{
            paddingLeft: theme.spacing(5)
        }
    }))

    const getTodos = async () =>{
        try {
            let response = await fetch('http://localhost:5000/',{
                method:'GET'
            })
            // returns a response from the server as a promise
            const data=  await response.json()
            setTodos(data);

        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getTodos()
    },[todoItem])

    


    

    
    const remove = async(todo) =>{
        
        try {
            const response = await fetch("http://localhost:5000/"+todo.todo_id,{
                method:'DELETE',
            }) 
            
        } catch (error) {
            console.log(error)
        }
       
    }
    const classes = useStyles()
    return(

        <Card className={classes.card}>
            <List>
            {todoItem.map((todo,i) => (
              


               <ListItem key={i}
                >
                  <ListItemText
                    primary={`${todo.description }`}
                    
                  />
                  <ListItemIcon >
                    <IconButton  edge="end" aria-label="edit">
                        
                        <Edit todo={todo}/>
                    </IconButton>
                  </ListItemIcon>
                  
                <ListItemIcon>
                    <IconButton onClick={()=> remove(todo)} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemIcon>

                
                </ListItem>

               
            ))}
            
            </List>
        </Card>
    );
       
}

export default list;