

// Import dependencies
const mongoose = require("mongoose");
const Todo = require("./model/Todo");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

mongoose.connect(process.env.MONGO_URI);



// Configure CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    preflightContinue: false,
    optionsSuccessStatus:  204,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// POST /api/todo
app.post('/api/todo', (req, res) => {
    console.log(req.body);

    const title = req.body.title;
    const comment = req.body.comment;
    const createdAt = Date.now();

    const todo = new Todo({
        title,
        comment,
        createdAt,
    });
    todo.save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ success: false }));
});

// GET /api/todo
app.get('/api/todo', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.json(todos);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then((removedTodo) => {
            if (removedTodo) {
                res.json({ success: true, message: "Todo deleted successfully" });
            } else {
                res.status(404).json({ success: false, message: "Internal server error" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    Todo.findByIdAndUpdate(id, updates, { new: true})
    .then((updatedTodo) => {
        if (updatedTodo) {
            res.json({ success: true, message: "Todo updated successfully"});
        }  
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error"});
    });
});

// Start the server
app.listen(3001, () => console.log('Server started on port  3001'));