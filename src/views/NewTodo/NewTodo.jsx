import { Link } from "react-router";
import { useState } from "react"
import "./NewTodo.css";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

function NewTodo() {

    const [todoData, setTodoData] = useState({
        todoItem: "",
        priority: "low",
        emoji: "😊"
    });
    const [emojiPickerOpen, setEmojiPickerOpen] = useState
        (false);

    const addTodo = async () => {
        const response = await axios.post(`http://localhost:8080/todos`,
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
                Add New Task
            </h1>
            <div>
                <div className="newTodo-form">
                    <h1 className="header-1">New Todo</h1>
                    <input
                        type="text"
                        className="input"
                        value={todoData.todoItem}
                        onChange={(e) => {
                            setTodoData({
                                ...todoData,
                                todoItem: e.target.value
                            })
                        }} />

                    <select value={todoData.priority}
                        className="selection" onChange={(e) => {
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
                    <button className="add-btn" onClick={addTodo}>Add Todo</button>
                </div>

            </div>
            <Link to="/" className="back-btn">Back</Link>
        </div>

    )
}

export default NewTodo;