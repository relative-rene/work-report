import React, { useState } from 'react';

function Todo({ description, due_date_and_time, is_done, onDelete, onUpdate, todo_id, isEditing }) {
    const [editDescription, setEditDescription] = useState(description);
    const iso = new Date(due_date_and_time).toLocaleString();
    const [shortDate, time] = iso.split(',');
    const [weekday, month, date, year] = new Date(shortDate).toString().split(' ')
    const dueDate = `${weekday} ${month} ${date}, ${year} ${time}`;

    return (
        <li key={'task-' + todo_id} className={is_done ? "Todo checked" : "Todo"}>
            <input type="checkbox" onChange={() => onUpdate(todo_id)} checked={is_done} />
            {isEditing ?
                <>
                    <i onClick={() => onDelete(todo_id)} className="fa-solid fa-trash-can" />
                    <input value={editDescription} type="text" onChange={(e) => setEditDescription(e.target.value)} />
                </> : `${description}`}
            <br />{!isEditing && dueDate}
        </li>
    );
}


export default Todo;