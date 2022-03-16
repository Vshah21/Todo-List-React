const express = require('express')
const cors = require('cors')
const pool = require("./db")


const app = express()
app.use(cors())

app.use(express.json())

// ROUTES

// create a todo
app.post("/", async(req,res) =>{

    try {
        const { description } = req.body
        const response = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING*",[description])
        res.json(response.rows[0])
    } catch (error) {
        console.log(error)
    }
})

// get all todos

app.get("/",async(req,res)=>{
    try {
        const response = await pool.query("SELECT * FROM todo")
        res.json(response.rows)

    
    } catch (error) {
        console.log(error)
    }
})

app.get("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id])
        res.json(response.rows)
        
    } catch (error) {
        
    }
})

//update a todo
app.put("/:id", async (req,res)=>{
    try {
        const {id}= req.params;
        const{description}= req.body;
        const response = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description, id] )
        res.json("Todo item Updated")
    } catch (error) {
        console.log(error)
    }
})

// delete a todo
app.delete('/:id',async(req, res)=>{
    try {
        const {id} =req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("Todo item Deleted")
    } catch (error) {
        
    }
})

app.listen(5000, ()=>{
    console.log("server has started on port 5000")
    
})