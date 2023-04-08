import { useState, useEffect, useContext } from "react"
import { contextTasks } from "../context/ContextTasks"

export function useTasks() {
    const [tasks, setTasks] = useState([])

    //agregar una nueva tarea, se agrega al backend y refresca las tareas totales.
    const handleOnSubmitAddTask = (evt) => {
        evt.preventDefault()
        console.log('ADD')
        const content = evt.target[0].value
        const date = evt.target[1].value
        const newTaskToFetch = {
            content: content,
            date: date
        }
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTaskToFetch)
            }
            fetch('http://localhost:3001/api/tasks/add', config)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    const newTasks = ([...tasks, result])
                    setTasks(newTasks)
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    

    //Elimina una tarea y actualiza las tareas mostradas en el cliente
    async function deleteTask(task) {
        try {
            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }
            let res = await fetch(`http://localhost:3001/api/tasks/delete/${task.id}`, config)
            let json = await res.json()
            setTasks(json)
        }
        catch (error) {
            console.log(error)
        }
    }

    function handleResetTasksServer(){
        try{
            fetch("http://localhost:3001/api/reset")
            .then(res => res.json())
            .then(resp =>{
                console.log(resp)
                setTasks(resp)
            })
        }
        catch(error){

        }

    }

    useEffect(() => { //llamada a la api externa en localhost:3001
        fetch("http://localhost:3001/api/tasks")
            .then(res => res.json())
            .then(resp => {
                setTasks(resp)
            })
    }, [])



    return {
        tasks,
        deleteTask, handleOnSubmitAddTask,
        handleResetTasksServer
    }
}