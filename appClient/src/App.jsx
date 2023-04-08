
import './App.css'
import { Form } from './components/Form'
import { TasksList } from './components/TasksList'
import { useTasks } from './hooks/useTasks'


function App() {
  console.log('APP')
  const {tasks, handleOnSubmitAddTask, deleteTask, handleResetTasksServer} = useTasks()

  return (
    <div className="App">
      <Form handleOnSubmitAddTask={handleOnSubmitAddTask} handleResetTasksServer={handleResetTasksServer}/>
      <TasksList tasks={tasks} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
