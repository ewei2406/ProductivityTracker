const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('build'))

class ProductivityTracker {
  constructor() {
    this.tasks = []
  }

  inRange = checkIndex => {
      return checkIndex >= 0 && checkIndex < this.tasks.length
  }

  getTodaysDate = () => {
    const date = new Date()
    const today = date.toISOString().split('T')[0]
    return today
  }

  createId = () => {
    let maxId = 0
    this.tasks.forEach(task => {if(task.id > maxId) {maxId = task.id}})
    return this.tasks.length === 0 ? 0 : maxId + 1 // Return 0 for id if no tasks, 1 than max id more otherwise
  }

  getAllTasks = () => {
    return this.tasks
  }

  createNewTask = (Title = 'New Title', Description = 'New Description', DateDue = '', Status = 'New') => {
    const newTask = { Title, Description, DateCreated: this.getTodaysDate(), DateDue, Status, id: this.createId() } // Generate date, id for task
    this.tasks.push(newTask)
    return newTask
  }

  deleteTask = removeIndex => {
    removeIndex = Number(removeIndex)
    this.tasks.splice(removeIndex, 1)
  }

  // Not used
  // setPropertyOfTask = (taskIndex, property, newVal) => {
  //   this.tasks[taskIndex][property] = newVal
  //   return this.tasks[taskIndex]
  // }

  replaceTask = (taskIndex, Title, Description, DateDue, Status) => {

    if (!this.inRange(taskIndex)) { return false } // Check if out of range
    
    this.tasks[taskIndex] = { 
      ...this.tasks[taskIndex], // Keep id and DateCreated the same
      Title: Title || 'Task Title', 
      Description: Description || 'Task Description',
      DateDue: DateDue || '',
      Status: Status || 'New'
    }

    return this.tasks[taskIndex]
  }

  moveTask = (takeFrom, insertBefore) => {
    if (!this.inRange(takeFrom)) { return false } // Check ranges
    insertBefore = Number(insertBefore) || 0 // Make sure is number, set 0 if not

    const moveTask = this.tasks.splice(takeFrom, 1)[0] // Remove the task to move from the list
    this.tasks.splice(insertBefore, 0, moveTask) // Insert the task to move into correct position
    return this.tasks
  }
}

const productivityTracker = new ProductivityTracker()
productivityTracker.createNewTask('Chores', 'Go to kitchen and wash dishes', '2021-06-01')
productivityTracker.createNewTask('Homework', 'Log into webassign and study the notes.', '2021-09-30')
productivityTracker.createNewTask('Bike', 'Pump is not attatching to the bike tire...', '2021-09-17')
productivityTracker.createNewTask('Jeff Bezos', 'Take down Jeff', '2021-09-18')
let r = productivityTracker.getAllTasks()
console.log(r)

// Get all tasks
app.get('/api/ToDoList', (req, res) => {
  res.json(productivityTracker.getAllTasks())
})

// Create a new task
app.post('/api/ToDoList', (req, res) => {
  const body = req.body
  const newTask = productivityTracker.createNewTask(body.Title, body.Description, body.DateDue, body.Status)
  res.json(newTask)
})

// Update a task (Replace task at specified position with specified task)
app.put('/api/ToDoList/:index', (req, res) => {
  const body = req.body
  const replaceIndex = req.params.index

  let newTask = productivityTracker.replaceTask(replaceIndex, 
    body.Title, 
    body.Description, 
    body.DateDue, 
    body.Status)

  if (newTask) {
    return res.json(newTask)
  } else {
    return res.status(400).send({ error: 'Index out of range' })
  }
})

// Delete task at specified position
app.delete('/api/ToDoList/:index', (req, res) => {
  const id = Number(req.params.index)
  productivityTracker.deleteTask(id)
  return res.status(204).end()
})

// Move task from position to specified position
app.post('/api/ToDoList/functions/move', (req, res) => {
  const body = req.body
  const takeFrom = Number(body.takeFrom) || 0 // Index of task to move
  const insertBefore = Number(body.insertBefore) || 0 // Index of task to insert other task before

  const result = productivityTracker.moveTask(takeFrom, insertBefore)

  if (result) {
    return res.json(result)
  } else {
    return res.status(400).send({ error: 'Index out of range' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
