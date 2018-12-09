import React from 'react';
import shortid from 'shortid';
import styles from '../assets/css/todo.css';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      todos: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ todo: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { todo } = this.state;
    const todoId = shortid.generate();

    this.setState(state => ({
      todos: {
        ...state.todos,
        [todoId]: { id: todoId, todo, isCompleted: false },
      },
    }));
  }

  changeTodo(todoId, property, value) {
    this.setState(state => ({
      todos: {
        ...state.todos,
        [todoId]: { ...state.todos[todoId], [property]: value },
      },
    }));
  }

  render() {
    const { todo, todos } = this.state;
    const todoList = Object.values(todos);

    return (
      <section className={styles.todoApp}>
        <form onSubmit={this.handleSubmit}>
          <span className={styles.checkAll} />
          <input
            type="submit"
            className={styles.todoInput}
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            value={todo}
          />
        </form>
        {todoList.length > 0 && (
          <>
            {todoList.map(todoItem => (
              <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                todo={todoItem.todo}
                isCompleted={todoItem.isCompleted}
                changeTodo={this.changeTodo}
              />
            ))}
            <TodoFooter />
          </>
        )}
      </section>
    );
  }
}

export default Todo;
