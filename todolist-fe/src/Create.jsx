import React from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function Home() {
    const [task, setTask] = useState([]);
    const handleAddTask = () => {
        axios.post("http://localhost:3001/add", { task: task })
        .then(result => {
          location.reload();
        })
        .catch(err => console.log(err));
    }
  return (
    <div className="create-form">
      <input type="text" placeholder="Add a new task" onChange={(e) => setTask(e.target.value)}/>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Home;