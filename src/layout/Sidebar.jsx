import React, { useState } from 'react';
import TodoApp from '../components/TodoApp';

const Sidebar = () => {
    const [isOpen, setVisibility] = useState(false);
    return (
        <section className={isOpen ? "Sidebar" : "Sidebar--closed"}>
            {isOpen ?
                <>
                    <i onClick={() => setVisibility(false)} className="fa-solid fa-bug" />
                    <h2 className="Title">Kaizen</h2>
                    <TodoApp />
                </> :
                <i onClick={() => setVisibility(true)} className="fa-solid fa-feather" />
            }

        </section>
    )
}

export default Sidebar;