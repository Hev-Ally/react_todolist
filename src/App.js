import React, { useState } from "react";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [task, setTask] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); 
  const [editedTask, setEditedTask] = useState(""); 

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setEditedTask(tasks[index].text); 
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === currentTaskIndex ? { ...t, text: editedTask } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTaskIndex(null);
    setEditedTask("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            {isEditing && currentTaskIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={handleEditChange}
                />
                <button className="save" onClick={saveEdit}>
                  <i className="fas fa-save"></i> Save
                </button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTaskCompletion(index)}>
                  {t.text}
                </span>
                <div className="button-container">
                  <button className="edit" onClick={() => startEditing(index)}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button className="delete" onClick={() => deleteTask(index)}>
                    <i className="fa-solid fa-eraser"></i> Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
