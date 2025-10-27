import {useState,useEffect} from "react";
import {Link} from "react-router"
import axios from "axios"
import "./Home.css"

function Home() {
  const [todos,setTodos] = useState([]);

  const loadTodos = async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data.data);
  }

  useEffect (()=>{
    loadTodos();
  }, []);

  const deleteTodo  = async(id)=>{
      const response = await axios.delete(`http://localhost:8080/todos/${id}`);
      if(response) {
        alert(response.data.message);
        loadTodos();
      }
  }
  return (
    <div>
      <h1 className="header">My Todo List</h1>
      {todos.map((todoObj)=>{
        const {id,todoItem,emoji,priority,isDone,createdAt} = todoObj;
        return <div key={id} className="todo-card"> 
        <span className="todo-priority">{priority}</span>
        <div className="todo-icon">{emoji}</div>
        <div className={`todo-detail  ${isDone?"todo-done":""}` }>
        <h2>{todoItem}</h2>
        </div>
        <span className="todo-created-at">
          {createdAt.replace("T"," ").slice(0,16)}
          </span>

          <button className="delete-btn" onClick={()=>{
            deleteTodo(id);
          }}>Delete Now</button>
        </div>
      })}
 <Link to="/new" className="newtodo-btn">New Todo</Link>
     
    </div>
  )
}

export default Home