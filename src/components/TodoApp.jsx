import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth'

const TodoApp = ({ list }) => {
    const { user } = useAuth();
    const [todoList, setList] = useState(list);
    const [description, setDescription] = useState('');
    const [dueDateAndTime, setDueDate] = useState('');
    const [onEditing, setEditingMode] = useState(false);
    const minDateValue = new Date().toISOString().slice(0, 16);
    const isReady = description && dueDateAndTime.length;

    const todos = todoList.map((entry) => {
        return <Todo
            isEditing={onEditing}
            onUpdate={onUpdateHandler}
            onDelete={onDeleteHandler}
            todo_id={entry._id}
            key={"todo-" + entry._id} {...entry} />
    });

    useEffect(() => {
        getTodoList()
    }, []);

    async function getTodoList() {
        return fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/read`)
            .then(res => res.json())
            .then(data => {
                let sortByDueDate = data.sort((a, b) => new Date(a.due_date_and_time) - new Date(b.due_date_and_time));
                let sortedByDone = sortByDueDate.sort((a, b) => a.is_done - b.is_done);
                setList(sortedByDone)
            });
    }

    async function onAddHandler() {
        const saveTodo = { description, isDone: false, dueDateAndTime: new Date(dueDateAndTime).toUTCString() }
        if (description.length !== 0) {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todo/create`,
                // const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${profile_id}/todo/create`,
                { method: 'post', body: JSON.stringify(saveTodo), headers: { "Content-Type": "application/json" } })
            const data = await response.json();
            setDescription('') && setDueDate('');
            data && getTodoList();
        }
    };

    async function onDeleteHandler(todo_id) {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/${todo_id}/delete`, { method: 'DELETE' });
        const data = await response.json();
        data && getTodoList();
    };

    async function onUpdateHandler(todo_id) {
        const newTodo = todoList.filter(todo => todo._id === todo_id).map(todo => Object.assign({}, { ...todo, is_done: !todo.is_done }));
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/todos/${todo_id}/updateOne`, { method: 'PUT', body: JSON.stringify(newTodo), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        data && getTodoList();
    }

    return (
        <div className="TodoApp">
            <div className="add-todo-form">
                <i onClick={() => setEditingMode(!onEditing)} title="Edit mode: remove task or edit description" className="fa-solid fa-pen fa-lg" />
                <input value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                <Button styleName="btn-todo" isDisabled={!isReady} handleClick={onAddHandler} >+</Button>

                {description &&
                    <label className="datetimeInput">
                        Complete By
                        <input value={dueDateAndTime} min={minDateValue} onChange={(e) => setDueDate((e.target.value))} type="datetime-local" />
                    </label>}
            </div>
            <ul className="TodoList">
                {todos}
            </ul>
        </div>
    );
}

export default TodoApp;