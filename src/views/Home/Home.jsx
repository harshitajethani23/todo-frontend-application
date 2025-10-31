import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Home.css";
import edit from "./pen.png"
import del from "./delete.png"

function Home() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
    setTodos(response.data.data);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const deleteTodo = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
    if (response) {
      alert(response.data.message);
      loadTodos();
    }
  };

  const markTodoDone = async (id, isDone) => {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}/status`,
      { isDone: isDone }
    );
    if (response) {
      loadTodos();
    }
  }
  return (
    <div>
      <h1 className="header">My Todo List</h1>
      {todos.map((todoObj) => {
        const { id, todoItem, emoji, priority, isDone, createdAt } = todoObj;
        return <div key={id} className="todo-card">
          <span className="todo-priority">{priority}</span>
          <input type="checkbox" checked={isDone} onChange={(e) => {
            markTodoDone(id, e.target.checked);
          }} />
          <div className="todo-icon">{emoji}</div>
          <div className={`todo-detail  ${isDone ? "todo-done" : ""}`}>
            <h2>{todoItem}</h2>
          </div>
          <span className="todo-created-at">
            {createdAt.replace("T", " ").slice(0, 16)}
          </span>

          <img src={del} className="delete-icon" onClick={() => {
            deleteTodo(id);
          }} />

          <Link to={`/edit/${id}`}>
            <img src={edit} className="edit-icon" /></Link>


        </div>
      })}
      <Link to="/new" className="newtodo-btn">New Todo</Link>

    </div>
  )
}

export default Home