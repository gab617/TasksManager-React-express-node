import { useEffect, useState } from 'react'
import {Task} from './Task'

export function TasksList({tasks, deleteTask}) {
    useEffect(()=>{
        console.log('task se actualiza')
    },[tasks])

    
    return (
        <ul>
            {
                tasks.map((task) => (
                    <li key={task.id}>
                        <Task task={task} deleteTask={deleteTask}/>
                    </li>
                ))
            }
        </ul>
    )
}

