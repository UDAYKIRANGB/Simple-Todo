import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editTitle: '',
  }

  onDelete = () => {
    const {todoDetails, deleteTodo} = this.props
    deleteTodo(todoDetails.id)
  }

  onEdit = () => {
    const {todoDetails} = this.props

    this.setState({
      isEditing: true,
      editTitle: todoDetails.title || '',
    })
  }

  onSave = () => {
    const {todoDetails, updateTodo} = this.props
    const {editTitle} = this.state

    updateTodo(todoDetails.id, editTitle || '')

    this.setState({isEditing: false, editTitle: ''})
  }

  onChangeTitle = event => {
    this.setState({editTitle: event.target.value})
  }

  render() {
    const {todoDetails, toggleComplete} = this.props
    const {id, title, isCompleted} = todoDetails
    const {isEditing, editTitle} = this.state

    return (
      <li className="todo-details">
        <input
          type="checkbox"
          checked={isCompleted || false}
          onChange={() => toggleComplete(id)}
        />

        <div className="name-container">
          {isEditing ? (
            <input
              type="text"
              value={editTitle || ''}
              onChange={this.onChangeTitle}
            />
          ) : (
            <p className={isCompleted ? 'completed' : ''}>{title}</p>
          )}
        </div>

        {isEditing ? (
          <button type="button" onClick={this.onSave} className="button">
            Save
          </button>
        ) : (
          <button type="button" onClick={this.onEdit} className="button">
            Edit
          </button>
        )}

        <button type="button" onClick={this.onDelete} className="button">
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
