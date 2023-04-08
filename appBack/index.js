const express = require('express')//    se importa express
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('./loggerMiddleware')
const DEFAULT_TASKS = require('./consts/const')

const app = express()// se declara app con servidor express
app.use(cors()) // por defecto cualquier origen funciona en nuestra api
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())// soluciona temas de parseo para comunicacion servior-cliente
app.use(logger)// al usar USE, sin definir un path especifico para analizar, todos los paths pasaran en logger.

let tasks = DEFAULT_TASKS

/* const app = http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'application/json'})
    response.end(JSON.stringify(tasks))
})
 */
console.log(DEFAULT_TASKS)
app.get('/', (request, response) => { // content Type lo define express
  response.send('<h1>Inicio de api</h1>')
})

app.get('/api/tasks', (request, response) => {
  response.json(tasks)
})

app.get('/api/tasks/:id', (request, response) => {
  const id = +request.params.id // de str a int
  const task = tasks.find(task => task.id === id) // busca la nota
  if (task) {
    response.json(task)
  } else {
    response.status(404)// si no esta la nota error 404 definido
  }
})

app.get('/api/reset', (request, response) => {
  tasks = DEFAULT_TASKS
  response.json(tasks)
})

app.delete('/api/tasks/delete/:id', (request, response) => {
  console.log(+request.body.id, 'ID A ELIMINAR')
  const id = +request.body.id
  tasks = tasks.filter((task) => task.id !== id)
  response.json(tasks)
  // response.status(204).end() // 204 no content
})

app.post('/api/tasks/add', (request, response, next) => {
  const task = request.body
  console.log(task, '<- task content')
  if (!task || !task.content) {
    return response.status(400).json({
      error: 'task.content no esta'
    })
  }

  const ids = tasks.map(task => task.id)
  let maxId
  if (ids.length === 0) { // Lista de tareas vacia?
    maxId = 1
  } else {
    maxId = Math.max(...ids) + 1
  }

  console.log(ids, 'IDS', maxId)

  const newtask = {
    id: maxId,
    content: task.content,
    important: task?.important || false,
    date: task?.date || new Date().toISOString()
  }

  tasks = [...tasks, newtask]
  /*  tasks = tasks.concat(newtask) */

  // status code 201- created
  response.status(201).json(newtask)
})

app.use((request, response) => {
  console.log('ERROR EN PATH ', request.path)
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`) // mensaje en consola luego de levantar el servidor
})
