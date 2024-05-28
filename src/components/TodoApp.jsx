import React, { useState } from 'react';
import Todo from './Todo';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData';

const TodoApp = () => {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [dueDateAndTime, setDueDate] = useState('');
    const [onEditing, setEditingMode] = useState(false);
    const { todos, updateTodos } = useData();
    const minDateValue = new Date().toISOString().slice(0, 16);
    const isReady = description && dueDateAndTime.length;

    const displayTodos = todos.map((entry) => {
        return <Todo
            isEditing={onEditing}
            onUpdate={onUpdateHandler}
            onDelete={onDeleteHandler}
            todo_id={entry._id}
            key={"todo-" + entry._id} {...entry} />
    });

    async function onAddHandler() {
        const saveTodo = { description, isDone: false, dueDateAndTime: new Date(dueDateAndTime).toUTCString() }
        if (description.length !== 0) {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/create_todo`,
                    { method: 'post', body: JSON.stringify(saveTodo), headers: { "Content-Type": "application/json" } })
                const data = await response.json();
                setDescription('') && setDueDate('');
                data ? updateTodos() : alert(`Add task failed. Cannot add task to future development with a MOCK USER.`);
            }
            catch (err) {
                console.error(err);
                alert('Add Task failed. Servers are down please try again later');
            }
        };
    }

    async function onDeleteHandler(todo_id) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/${todo_id}/delete_todo`, { method: 'DELETE' });
            const data = await response.json();
            data ? updateTodos() : alert(`Cannot delete task with a MOCK USER`);
        }
        catch (err) {
            console.error(err);
            alert('Delete Task failed. Servers are down please try again later');
        };
    }

    async function onUpdateHandler(todo_id, hasNewDescription, newDescription) {
        const newTodo = hasNewDescription ?
            todos.filter(todo => todo._id === todo_id).map(todo => Object.assign({}, { ...todo, description: newDescription })) :
            todos.filter(todo => todo._id === todo_id).map(todo => Object.assign({}, { ...todo, is_done: !todo.is_done }));
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/${todo_id}/updateOne_todo`, { method: 'PUT', body: JSON.stringify(newTodo), headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            data ? updateTodos() : alert('Update failed. You cannot update with a MOCK USER.')
        } catch (err) {
            console.error(err);
            alert('Update task failed. Servers are down. please try again later');
        }
    }

    return (
        <div className="TodoApp">
            <i className="fa-solid fa-pencil" onClick={() => setEditingMode(!onEditing)} title="Edit mode: remove task or edit description" />
            <div className="add-todo-form">
                <div className="description-container">
                    <label>Future development task.</label>
                    <input className="description-container__input" value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                {description &&
                    <div className="duedate-container">
                        <label className="duedate-container__label">Complete By</label>
                        <input className="duedate-container__input" value={dueDateAndTime} min={minDateValue} onChange={(e) => setDueDate((e.target.value))} type="datetime-local" />
                    </div>
                }
                {description &&
                    dueDateAndTime &&
                    <Button styleName="duedate-container__button" isDisabled={!isReady} handleClick={onAddHandler} >
                        I PLEDGE THIS LABOR
                    </Button>
                }
            </div>
            <ul className="TodoList">
                {displayTodos}
            </ul>
        </div>
    );
}

export default TodoApp;