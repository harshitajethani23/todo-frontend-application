import { Link } from "react-router";
import { useState, useEffect } from "react"
import "./EditTodo.css";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useParams } from "react-router"

function EditTodo() {
    const { id } = useParams();

    const [todoData, setTodoData] = useState({
        todoItem: "",
        priority: "low",
        emoji: "😊",
        isDone: false
    });

    const loadTodo = async (id) => {
        if (!id) return;
        const response = await axios.get(`http://localhost:8080/todos/${id}`);
        const todoDetail = response.data.data;
        setTodoData({
            todoItem: todoDetail.todoItem,
            priority: todoDetail.priority,
            emoji: todoDetail.emoji,
            isDone: todoDetail.isDone,
        })
    };

    useEffect(() => {
        loadTodo(id);
    }, [id]);

    const [emojiPickerOpen, setEmojiPickerOpen] = useState
        (false);

    const UpdateTodo = async () => {
        const response = await axios.put(`http://localhost:8080/todos/${id}`,
            todoData);
        if (response) {
            alert(response.data.message);

            setTimeout(() => {
                window.location.href = "/";
            }, 2000)
        }
    }

    return (
        <div>
            <h1 className="heading">
                Edit a Task
            </h1>
            <div>
                <div className="newTodo-form">
                    <h1 className="header-1">Edit Todo:{id}</h1>
                    <input
                        className="input"
                        type="text"
                        value={todoData.todoItem}
                        onChange={(e) => {
                            setTodoData({
                                ...todoData,
                                todoItem: e.target.value
                            })
                        }} />

                    <select value={todoData.priority}
                        className="selection"
                        onChange={(e) => {
                            setTodoData({
                                ...todoData,
                                priority: e.target.value,
                            })
                        }}>
                        <option value="low">Low priority</option>
                        <option value="medium">Medium priority</option>
                        <option value="high">High priority</option>
                    </select>

                    <span className="emoji"
                        onClick={() => {
                            setEmojiPickerOpen(!emojiPickerOpen);
                        }}>
                        Emoji:{todoData.emoji}
                    </span>


                    <EmojiPicker onEmojiClick={({ emoji }) => {
                        setTodoData({
                            ...todoData,
                            emoji: emoji
                        });
                        setEmojiPickerOpen(false);
                    }}
                        open={emojiPickerOpen} />
                    <button className="edit-btn" onClick={UpdateTodo}>Update Todo</button>
                </div>

            </div>
            <Link to="/" className="back-btn">Back</Link>
        </div>

    )
}

export default EditTodo;