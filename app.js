const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(`mongodb+srv://root:CdLeejqYl0BDpKLE@cluster0.raizszz.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log(`Connected to mongoDB`)
})

const Task = mongoose.model('Task',{
    title: String, 
    description: String,
    deadline: String,
    createdTime: Number,
})
app.post('/add-task', async (req, res) => {
    try {
        const { title, description, deadline, createdTime } = req.body;
        const task = new Task({
            title,
            description,
            deadline,
            createdTime
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get('/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(err){
        res.status(500).json({message: err});
    }
})
app.delete('/task/:id', async ( req, res )=>{
    try {
        const id = req.params.id;
        console.log(id);
        await Task.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})
app.put('/edit-task/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(PORT, ()=>{
    console.log(`Server work on PORT: ${PORT}`)
});