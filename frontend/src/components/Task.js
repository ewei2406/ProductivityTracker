/* eslint-disable react/prop-types */
import ListService from '../services/ListService'
import { useState } from 'react'
import TimeToDue from './TimeToDue'

const Task = ({ Task, TaskIndex, MoveHandler, DeleteHandler, DefaultEditState }) => {
  const [isEdit, setIsEdit] = useState(DefaultEditState)

  const [newTask, setNewTask] = useState(Task)

  const submitChanges = () => {
    setIsEdit(false)
    ListService.editTask(newTask, TaskIndex)
  }

  const cancelChanges = () => {
    setIsEdit(false)
    setNewTask(Task)
  }

  if (isEdit) {
    return (
      <table className="edit">
        <thead>
          <tr>
            <th className="col1"></th>
            <th className="col2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              <input type="text" value={ newTask.Title }
                onChange={event => setNewTask({ ...newTask, Title: event.target.value })}/>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <textarea type="text" value={ newTask.Description }
                onChange={event => setNewTask({ ...newTask, Description: event.target.value })}/>
            </td>
          </tr>
          <tr>
            <td>Date Due</td>
            <td>
              <input type="date" value={newTask.DateDue}
                onChange={event => setNewTask({ ...newTask, DateDue: event.target.value })}/>
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select value={newTask.Status} onChange={event => setNewTask({ ...newTask, Status: event.target.value })}>
                <option value="New">New</option>
                <option value="Stuck">Stuck</option>
                <option value="Working">Working</option>
                <option value="Finished">Finished</option>
              </select>
            </td>
          </tr>
          <tr><td></td></tr>
          <tr>
            <td colSpan="2">
              <button onClick={submitChanges} style={{ "--color": "green" }}><i className="fas fa-save"></i> Save</button>
              <button onClick={cancelChanges} style={{ "--color": "red" }}><i className="fas fa-times"></i> Cancel</button>
              <button onClick={MoveHandler(TaskIndex, 0)}><i className="fas fa-angle-double-up"></i></button>
              <button onClick={MoveHandler(TaskIndex, TaskIndex - 1)}><i className="fas fa-angle-up"></i></button>
              <button onClick={MoveHandler(TaskIndex, TaskIndex + 1)}><i className="fas fa-angle-down"></i></button>
              <button onClick={MoveHandler(TaskIndex, -1)}><i className="fas fa-angle-double-down"></i></button>
              <button onClick={DeleteHandler(TaskIndex)} style={{ "--color": "red" }}><i className="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">
            <i className="fas fa-sticky-note"></i> {newTask['Title']}
          </th>
        </tr>
        <tr>
          <th colSpan="2">
            <TimeToDue DueDate={newTask.DateDue}/>
          </th>
        </tr>
        <tr>
          <th className="col1"></th>
          <th className="col2"></th>
        </tr>
      </thead>
      <tbody>
        {['Description', 'DateCreated', 'DateDue', 'Status'].map(key =>
          <tr key={key}>
            <td>{key.match(/[A-Z][a-z]+/g).join(' ')}</td>{/* Convert "DateCreated" to "Date Created" */}
            <td>{newTask[key] || 'Not Set'}</td>
          </tr>
        )}
        <tr>
          <td><button onClick={() => setIsEdit(true)}><i className="fas fa-pen"></i> Edit</button></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Task
