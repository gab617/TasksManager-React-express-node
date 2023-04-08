import { useState } from "react"

export function Task({ task , deleteTask}) {
    
    const { id, content, date, important } = task
    const [className, setClassName] = useState(important ? 'important' : ' ')

    const handleImportant = () => {
        task.important = !task.important
        setClassName(task.important ? 'important' : ' ')
    }

    return (
        <div className="Task">
            <label>Task {id}</label>
            <div className="task">
                <h1>{content}</h1>
            </div>
            <button onClick={() => deleteTask(task)}>Eliminar</button>
            <button onClick={handleImportant} className={className}>Importante</button>
            <p>{date}</p>
            <div className="checkTask">
                <label htmlFor="">OK?</label>
                <input type="checkbox" />
            </div>
        </div>
    )

}