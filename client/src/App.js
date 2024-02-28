

import './App.css';
import TodoList from './components/TodoList';

import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [showtodos, setShowTodos] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const data = { title, comment };
    fetch('http://localhost:3001/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }


  function renderMain() {

    return (


      <form onSubmit={handleSubmit}>

        <label>
          Title:
          <input type="text" value={title} onChange={e =>
            setTitle(e.target.value)} />
        </label>

        <label>
          Comment:
          <input type="text" value={comment} onChange={e =>
            setComment(e.target.value)} />
        </label>

        <button type="submit">submit</button>

        <button onClick={handleShowTodos}>Show Todos</button>

      </form>

    )
  }


  function handleShowTodos() {
    setShowTodos(true);
    console.log(showtodos);
  }
  
  function handleHideTodos() {
    setShowTodos(false);
    console.log(showtodos);
  }


  return (

    <div>
      
      {showtodos ? (
        <>
        <TodoList />

        <button onClick={handleHideTodos}>Hide Todos</button>
        </>

      ) : (
        renderMain()

      )}
    </div>
  );
}

export default App;
