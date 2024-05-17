import React, { useState } from 'react';

function Todo({ description, due_date_and_time, is_done, onDelete, onUpdate, todo_id, isEditing }) {
    const [editedDescription, setEditedDescription] = useState(description);
    const iso = new Date(due_date_and_time).toLocaleString();
    const [shortDate, time] = iso.split(',');
    const [weekday, month, date, year] = new Date(shortDate).toString().split(' ')
    const dueDate = `${weekday} ${month} ${date}, ${year} ${time}`;

    return (<li key={'task-' + todo_id} className={is_done ? "Todo--checked" : "Todo"}>
        {isEditing ?
            <>
                <i onClick={() => onDelete(todo_id)} className="fa-solid fa-trash-can" />
                <input value={editedDescription} type="text" onChange={(e) => setEditedDescription(e.target.value)} />
                <i onClick={() => onUpdate(todo_id, true, editedDescription)} className="fa-regular fa-floppy-disk" />
            </> :
            <>
                <input type="checkbox" onChange={() => onUpdate(todo_id)} checked={is_done} />
                {description}<br /> {dueDate}
            </>
        }
    </li>
    );
}


export default Todo;