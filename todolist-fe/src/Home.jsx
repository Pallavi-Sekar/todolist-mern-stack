import React, { useEffect, useState } from "react";
import "./App.css";
import Create from "./Create.jsx";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/get")
        .then(response => {
            setTodos(response.data.todos);
        })
        .catch(err => console.log(err));
    }, [])

    const handleEdit = (id) => {  
         axios.put("http://localhost:3001/update/" + id)
        .then(response => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleDelete = (id) => {  
         axios.put("http://localhost:3001/delete/" + id)
        .then(response => {
            location.reload();
        })
        .catch(err => console.log(err));
    }
  return (
    <div className = "home">
        <h2>Todo List</h2>
        <Create/>
        {
            todos.length === 0 ? <h2>No tasks available</h2> :
            todos.map(todo => (
                <div className="display-todos">
                    <div className="check-box" onClick={() => handleEdit(todo._id)} >
                        {todo.done ? 
                        <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                        : 
                        <BsCircleFill className="icon"/>}
                    <p className = {todo.done ? "line_through" : ""}>{todo.task}</p>
                    </div>
                    <div>
                       <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                </div>
            ))
        }
    </div>
  );
}   
export default Home;