
import { createContext, useState } from "react";
export const contextTasks = createContext()


export function ContextTasksProvider ({children}){
    //no cumple ninguna funcion, esta definido solamente
    console.log('Context')
    const [tasksList, setTasks] = useState(['context'])


    
    return (
        <contextTasks.Provider value={
            {tasksList}
        }>
            {children}
        </contextTasks.Provider>
    )
}