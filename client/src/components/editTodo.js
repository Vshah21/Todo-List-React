import EditIcon from '@mui/icons-material/Edit';
import React, { useState} from 'react';
import { Button,Box,Typography,Modal ,TextField} from '@mui/material'

const Edit = ({todo}) =>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setDescription(todo.description)
    }

    const handleClose = () => setOpen(false);

    const handleChange =(event)=>{
        const description = event.target.value
        setDescription(description)
    }

    const editTodo = async( todo_id,description) =>{

        try {
            
            const response = await fetch("http://localhost:5000/"+todo_id,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({description: description})
            }) 
            console.log(await response.json())
        } catch (error) {
            console.log(error)
        }

    }


    const submit =()=>{
        editTodo(todo.todo_id,description)
    }

    return(
       <div>
           <EditIcon onClick={handleOpen}/>
           <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Todo Item  {todo.todo_id}
                </Typography>
                
                <TextField onChange={handleChange} id="outlined-basic" value={description} variant="outlined" />
                <Button onClick={submit}variant="contained">Save Changes</Button>

                </Box>
            </Modal>
       </div>

    )
   
}

export default Edit;