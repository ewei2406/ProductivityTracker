import { useEffect, useState } from 'react'
import ListService from './services/ListService'
// eslint-disable-next-line no-unused-vars
import Task from './components/Task'
import './Style.css'

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    ListService.getAll()
      .then(result => {
        setTasks(result)
      })
  }, [])

  const deleteHandler = (index) => {
    const handler = () => {
      ListService.deleteTask(index)
      setTasks(tasks.filter((item, i) => i !== index))
    }

    return handler
  }

  const moveHandler = (takeFrom, insertBefore) => {
    const handler = () => {
      insertBefore = insertBefore < 0
        ? tasks.length
        : insertBefore

      ListService.moveTask(takeFrom, insertBefore)
        .then(response => setTasks(response))
    }
    return handler
  }

  const createTask = () => {
    const newTask = {
      Title: 'New Task',
      Description: 'New Description',
      DateDue: '',
      Status: 'New'
    }

    ListService.createTask(newTask)
      .then(response => setTasks(tasks.concat(response)))
  }

  return (
    <>
      <h1>
        <i className="fas fa-clipboard-list"></i> Productivity Tracker 
        <span style={{ fontWeight: "normal", fontSize: "12px" }}> Created for Forge SWE Challenge 2021</span>
      </h1>
    
      {tasks.map((task, index) =>
        <Task Task={task}
          key={task.id}
          TaskIndex={index}
          DeleteHandler={deleteHandler}
          MoveHandler={moveHandler}
          DefaultEditState={task.EditState || false}/>
      )}

      <button onClick={createTask} style={{ margin: "0px" }}><i className="fas fa-plus"></i> New Task</button>
    </>
  )
}

export default App
