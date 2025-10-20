const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mongo_ca:Temp%40123@cluster0.aq1lyua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo')

app.post("/add",(req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task }).then(result => res.json(result))
.catch(err => res.json(err))
});

app.get("/get", async (req, res) => {
    try {
        const todos =  await TodoModel.find({});
        res.json({ todos: todos.map(todo => todo) });
    }   catch (err) {
        res.json({ error: err });
    }
});

app.put("/update/:id", (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put("/delete/:id", (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});