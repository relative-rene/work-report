import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import Button from './UI/Button';
import { useAuth } from '../hooks/useAuth'

const TodoApp = ({ list }) => {
    //const { user } = useAuth() TODO uncomment once ready, its commented out because I want all my TODO not linked to login for the moment
    const [profile_id, setProfileID] = useState('650a38c328bf0c645f4d8f66');// TODO replace profile_id with user._id
    const [todoList, setList] = useState(list);
    const [description, setDescription] = useState('');
    const [dueDateAndTime, setDueDate] = useState('');
    const [groupedTask, setGroup] = useState([]);
    const [onEditing, setEditingMode] = useState(false);
    const [onGrouping, setGroupingMode] = useState(false);
    const minDateValue = new Date().toISOString().slice(0, 16);
    const isReady = description && dueDateAndTime.length;

    const todos = todoList.map((entry, idx) => {
        return <Todo
            isEditing={onEditing}
            isGrouping={onGrouping}
            onUpdate={onUpdateHandler}
            onDelete={onDeleteHandler}
            onGroup={onGroupingHandler}
            todo_id={entry._id}
            key={"todo-" + idx} {...entry} />
    });

    useEffect(() => {
        getTodoList()
    }, []);

    async function getTodoList() {
        // return fetch(`http://localhost:4000/api/profiles/${user._id}/todos/read`)
        return fetch(`http://localhost:4000/api/profiles/${profile_id}/todos/read`)
            .then(res => res.json())
            .then(data => {
                let sortByDueDate = data.sort((a, b) => new Date(a.due_date_and_time) - new Date(b.due_date_and_time));
                let sortedByDone = sortByDueDate.sort((a, b) => a.is_done - b.is_done);
                setList(sortedByDone)
            });
    }

    async function onAddHandler() {
        const saveTodo = { description, isDone: false, dueDateAndTime }
        if (description.length !== 0) {
            // const response = await fetch(`http://localhost:4000/api/profiles/${user._id}/todo/create`,
            const response = await fetch(`http://localhost:4000/api/profiles/${profile_id}/todo/create`,
                { method: 'post', body: JSON.stringify(saveTodo), headers: { "Content-Type": "application/json" } })
            const data = await response.json();
            setDescription('') && setDueDate('');

            data && getTodoList();
        }
    };

    async function onDeleteHandler(todo_id) {
        const response = await fetch(`http://localhost:4000/api/profiles/${profile_id}/todos/${todo_id}/delete`, { method: 'DELETE' });
        // const response = await fetch(`http://localhost:4000/api/profiles/${user._id}/todos/${todo_id}/delete`, { method: 'DELETE' });
        const data = await response.json();
        data && getTodoList();
    };

    async function onHandleGroupClick(e) {
        console.log(e)
        setGroupingMode(!onGrouping)
        setGroup([])
        // Create a grouping api
        // What's the goal of group
        // What it needs to accomplish
        // create group user interface
        // add group route, model and controller(maybe);
    }
    async function onGroupingHandler(id) {
        if (onGrouping) {
            setGroup([...groupedTask, id])
        }
        console.log(groupedTask);
    }

    async function onUpdateHandler(todo_id) {
        const newTodo = todoList.filter(todo => todo._id === todo_id).map(todo => Object.assign({}, { ...todo, is_done: !todo.is_done }));
        // const response = await fetch(`http://localhost:4000/api/profiles/${user._id}/todos/${todo_id}/updateOne`, { method: 'PUT', body: JSON.stringify(newTodo), headers: { "Content-Type": "application/json" } });
        const response = await fetch(`http://localhost:4000/api/profiles/${profile_id}/todos/${todo_id}/updateOne`, { method: 'PUT', body: JSON.stringify(newTodo), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        data && getTodoList();
    }

    return (
        <div className="TodoApp">
            <div className="AddTodo">
                <i onClick={() => setEditingMode(!onEditing)} title="Edit mode: remove task or edit description" className="fa-solid fa-pen" />
                <i onClick={onHandleGroupClick} title="Group mode: click before selecting which task to group" className="fa-solid fa-cubes-stacked" />
                <input value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                <Button styleName="btn-todo" isDisabled={!isReady} handleClick={onAddHandler} >+</Button>

                {description &&
                    <label className="datetimeInput">
                        Complete By
                        <input value={dueDateAndTime} min={minDateValue} onChange={(e) => setDueDate(e.target.value)} type="datetime-local" />
                    </label>}
            </div>
            <ul className="TodoList">
                {todos}
            </ul>
        </div>
    );
}

export default TodoApp;