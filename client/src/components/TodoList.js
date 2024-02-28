

import React, { useEffect, useState } from "react";

function TodoList() {

    const [todos, setTodos] = useState([]);
    const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");
    const [updatedTodoComment, setUpdatedTodoComment] = useState("");

    const [currentEditingTodoId, setCurrentEditingTodoId] = useState("");


    function deleteTodo(id) {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {

                    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
                }
            })
            .catch((error) => console.log(error));

    }


    function updateTodo(id) {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: updatedTodoTitle,
                comment: updatedTodoComment
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTodos((prevTodos) =>
                        prevTodos.map((todo) =>
                            todo._id === id ? { ...todo, title: updatedTodoTitle, comment: updatedTodoComment } : todo
                        )
                    );
                    setCurrentEditingTodoId("");
                    setUpdatedTodoTitle("");
                    setUpdatedTodoComment("");

                }
            })
            .catch((error) => console.log(error));

    }


    useEffect(() => {

        fetch("http://localhost:3001/api/todo")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.log(error));

    }, []);


    return (
        <div>
            <h1>Todo List</h1>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th >Title</th>
                        <th >Comment</th>
                        <th >Created At</th>
                        <th >Update</th>
                        <th >Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item) => (
                        <tr key={item._id} style={{ marginBottom: "20px" }}>
                            <td>
                                {currentEditingTodoId === item._id ? (
                                    <input
                                        type="text" placeholder={item.title}
                                        value={updatedTodoTitle}
                                        onChange={(e) => setUpdatedTodoTitle(e.target.value)}
                                    />
                                ) : (
                                    item.title
                                )}
                            </td>
                            <td>
                                {currentEditingTodoId === item._id ? (
                                    <input
                                        type="text" placeholder={item.comment}
                                        value={updatedTodoComment} 
                                        onChange={(e) => setUpdatedTodoComment(e.target.value)}
                                    />
                                ) : (
                                    item.comment
                                )}
                            </td>
                            <td>{item.createdAt}</td>
                            <td>
                                {currentEditingTodoId === item._id ? (
                                    <>
                                        <button onClick={() => updateTodo(item._id)}>Save</button>
                                        <button onClick={() => setCurrentEditingTodoId("")}>Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => setCurrentEditingTodoId(item._id)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => deleteTodo(item._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;