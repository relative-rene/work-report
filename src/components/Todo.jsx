import React, { useState } from 'react';

function Todo({ description, due_date_and_time, is_done, onDelete, onUpdate, onGroup, todo_id, isEditing, isGrouping }) {
    const [editDescription, setEditDescription] = useState(description);
    const [day, month, date, year, time] = new Date((due_date_and_time).toLocalString()).toString().split(' ')// ['Fri', 'Mar', '22', '2024', '04:30:00', 'GMT-0700', '(Pacific', 'Daylight', 'Time)']
    const am_pm = 12 >= Number(time.split(':')[0]) ? 'pm' : 'am';
    const dueDate = `${day} ${month}/${date}/${year} ${time.split(':').slice(0, 2).join(':')} ${am_pm}`;

    return (
        <li key={'task-' + todo_id} onClick={() => onGroup(todo_id)} className={is_done ? "Todo checked" : "Todo"}>
            <input type="checkbox" onChange={() => onUpdate(todo_id)} checked={is_done} />
            {isEditing?
            <>
                <i onClick={() => onDelete(todo_id)} className="fa-solid fa-trash-can" />
                <input value={editDescription} type="text" onChange={(e) => setEditDescription(e.target.value)} />
            </>: `${description}`}
            <br/>{!isEditing && dueDate}
        </li>
    );
}


export default Todo;