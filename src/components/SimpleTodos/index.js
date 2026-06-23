import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosDetailsList: initialTodosList,
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodo = () => {
    const {inputValue} = this.state

    if (inputValue.trim() === '') {
      return
    }

    const words = inputValue.trim().split(' ')
    const lastWord = words[words.length - 1]

    if (!Number.isNaN(Number(lastWord))) {
      const count = Number(lastWord)
      const title = words.slice(0, words.length - 1).join(' ')

      const newTodos = []

      for (let i = 0; i < count; i += 1) {
        newTodos.push({
          id: Date.now() + i,
          title,
          isCompleted: false,
        })
      }

      this.setState(prevState => ({
        todosDetailsList: [...prevState.todosDetailsList, ...newTodos],
        inputValue: '',
      }))
    } else {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        isCompleted: false,
      }

      this.setState(prevState => ({
        todosDetailsList: [...prevState.todosDetailsList, newTodo],
        inputValue: '',
      }))
    }
  }

  deleteTodo = id => {
    const {todosDetailsList} = this.state

    const filteredList = todosDetailsList.filter(each => each.id !== id)

    this.setState({todosDetailsList: filteredList})
  }

  updateTodo = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosDetailsList: prevState.todosDetailsList.map(each =>
        each.id === id ? {...each, title: updatedTitle} : each,
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosDetailsList: prevState.todosDetailsList.map(each =>
        each.id === id ? {...each, isCompleted: !each.isCompleted} : each,
      ),
    }))
  }

  render() {
    const {todosDetailsList, inputValue} = this.state
    return (
      <div className="container">
        <div className="card-container">
          <div className="input-heading-container">
            <h1 className="heading">Simple Todos</h1>
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={this.onChangeInput}
                placeholder="Enter Todo"
                className="input-element"
              />
              <button
                type="button"
                onClick={this.addTodo}
                className="button-add"
              >
                Add
              </button>
            </div>
          </div>
          <ul className="todo-list">
            {todosDetailsList.map(eachTodo => (
              <TodoItem
                todoDetails={eachTodo}
                key={eachTodo.id}
                deleteTodo={this.deleteTodo}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
