import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './App.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return; 

    const newReminder = {
      id: Date.now(),
      text: text,
    };

    setReminders([...reminders, newReminder]);
    setText(''); 
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((item) => item.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Мои Напоминания</h1>
      
      {/* Форма ввода */}
      <form className="input-container" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Введите текст напоминания..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">
          <FaPlus /> Добавить
        </button>
      </form>

      {/* Список напоминаний */}
      <ul className="reminder-list">
        {reminders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>
            Список пуст. Добавьте первое напоминание!
          </p>
        ) : (
          reminders.map((item) => (
            <li key={item.id} className="reminder-item">
              <span>{item.text}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                title="Удалить"
              >
                <FaTrash />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;